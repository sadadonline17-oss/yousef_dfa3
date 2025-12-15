import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Country, getCountryByCode, COUNTRIES } from "@/lib/countries";
import { ArrowRight, FileText, Scale, Download, Eye, Stamp, PenTool } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

interface ContractTemplate {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  fields: Array<{
    label: string;
    labelEn: string;
    type: "text" | "number" | "date" | "textarea";
    required: boolean;
  }>;
  legalRequirements: string[];
  signatureFields: string[];
}

const Contracts = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedCountry = getCountryByCode(country || "");
  const createLink = useCreateLink();

  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [contractData, setContractData] = useState<Record<string, string>>({});

  const contractTemplates: ContractTemplate[] = [
    {
      id: "service_agreement",
      name: "عقد اتفاق خدمة",
      nameEn: "Service Agreement Contract",
      category: "خدمات",
      fields: [
        { label: "اسم العميل", labelEn: "Client Name", type: "text", required: true },
        { label: "اسم الشركة المزودة", labelEn: "Service Provider Name", type: "text", required: true },
        { label: "وصف الخدمة", labelEn: "Service Description", type: "textarea", required: true },
        { label: "مدة العقد", labelEn: "Contract Duration", type: "text", required: true },
        { label: "قيمة العقد", labelEn: "Contract Value", type: "number", required: true },
        { label: "تاريخ البداية", labelEn: "Start Date", type: "date", required: true },
        { label: "تاريخ النهاية", labelEn: "End Date", type: "date", required: true },
      ],
      legalRequirements: [
        "يجب توثيق العقد في الشهر العقاري",
        "يلزم ختم الغرفة التجارية",
        "توقيعان من الطرفين",
      ],
      signatureFields: ["clientSignature", "providerSignature", "witnessSignature"],
    },
    {
      id: "employment_contract",
      name: "عقد عمل موظف",
      nameEn: "Employment Contract",
      category: "توظيف",
      fields: [
        { label: "اسم الموظف", labelEn: "Employee Name", type: "text", required: true },
        { label: "رقم الهوية", labelEn: "ID Number", type: "text", required: true },
        { label: "المنصب الوظيفي", labelEn: "Job Position", type: "text", required: true },
        { label: "اسم صاحب العمل", labelEn: "Employer Name", type: "text", required: true },
        { label: "الراتب الشهري", labelEn: "Monthly Salary", type: "number", required: true },
        { label: "تاريخ بداية العمل", labelEn: "Start Date", type: "date", required: true },
        { label: "مدة التجربة", labelEn: "Probation Period", type: "text", required: true },
      ],
      legalRequirements: [
        "توثيق في وزارة العمل",
        "ختم المؤسسة",
        "توقيع ثلاثة أطراف",
      ],
      signatureFields: ["employeeSignature", "employerSignature", "hrSignature"],
    },
    {
      id: "sale_purchase",
      name: "عقد بيع وشراء",
      nameEn: "Sale and Purchase Agreement",
      category: "بيع",
      fields: [
        { label: "اسم البائع", labelEn: "Seller Name", type: "text", required: true },
        { label: "اسم المشتري", labelEn: "Buyer Name", type: "text", required: true },
        { label: "وصف المنتج", labelEn: "Product Description", type: "textarea", required: true },
        { label: "سعر البيع", labelEn: "Sale Price", type: "number", required: true },
        { label: "تاريخ البيع", labelEn: "Sale Date", type: "date", required: true },
        { label: "طريقة الدفع", labelEn: "Payment Method", type: "text", required: true },
      ],
      legalRequirements: [
        "توثيق في المحكمة",
        "ختم البلدية",
        "توقيع شاهد",
      ],
      signatureFields: ["sellerSignature", "buyerSignature", "witness1Signature", "witness2Signature"],
    },
    {
      id: "lease_agreement",
      name: "عقد إيجار عقار",
      nameEn: "Property Lease Agreement",
      category: "عقارات",
      fields: [
        { label: "اسم المالك", labelEn: "Owner Name", type: "text", required: true },
        { label: "اسم المستأجر", labelEn: "Tenant Name", type: "text", required: true },
        { label: "وصف العقار", labelEn: "Property Description", type: "textarea", required: true },
        { label: "عنوان العقار", labelEn: "Property Address", type: "textarea", required: true },
        { label: "قيمة الإيجار الشهري", labelEn: "Monthly Rent", type: "number", required: true },
        { label: "فترة الإيجار", labelEn: "Lease Period", type: "text", required: true },
        { label: "تاريخ بداية الإيجار", labelEn: "Start Date", type: "date", required: true },
      ],
      legalRequirements: [
        "توثيق في محكمة الأحوال الشخصية",
        "ختم مكتب الاستشارات القانونية",
        "توقيع شاهدين",
      ],
      signatureFields: ["ownerSignature", "tenantSignature", "witness1Signature", "witness2Signature"],
    },
    {
      id: "consulting_contract",
      name: "عقد استشارات",
      nameEn: "Consulting Contract",
      category: "استشارات",
      fields: [
        { label: "اسم العميل", labelEn: "Client Name", type: "text", required: true },
        { label: "اسم المستشار", labelEn: "Consultant Name", type: "text", required: true },
        { label: "نوع الاستشارة", labelEn: "Consultation Type", type: "text", required: true },
        { label: "تفاصيل المشروع", labelEn: "Project Details", type: "textarea", required: true },
        { label: "قيمة الأتعاب", labelEn: "Consultation Fees", type: "number", required: true },
        { label: "تاريخ البداية", labelEn: "Start Date", type: "date", required: true },
      ],
      legalRequirements: [
        "توثيق في غرفة المحامين",
        "ختم المؤسسة الاستشارية",
        "توقيع معتمد",
      ],
      signatureFields: ["clientSignature", "consultantSignature", "witnessSignature"],
    },
  ];

  const getCountrySpecificElements = (countryCode: string) => {
    const elements = {
      SA: {
        logo: "🇸🇦",
        seal: "المملكة العربية السعودية",
        legalText: " وفقاً لنظام المرافعات الشرعية والأنظمة ذات الصلة في المملكة العربية السعودية",
        authority: "المحكمة العامة",
        stampPosition: "bottom-left",
        signaturePosition: "bottom-right",
      },
      AE: {
        logo: "🇦🇪",
        seal: "دولة الإمارات العربية المتحدة",
        legalText: " وفقاً لقانون المعاملات المدنية والتجارية لدولة الإمارات العربية المتحدة",
        authority: "محاكم دبي",
        stampPosition: "bottom-left",
        signaturePosition: "bottom-right",
      },
      KW: {
        logo: "🇰🇼",
        seal: "دولة الكويت",
        legalText: " وفقاً لقانون المرافعات التجارية والتجارية لدولة الكويت",
        authority: "محاكم الكويت",
        stampPosition: "bottom-left",
        signaturePosition: "bottom-right",
      },
      QA: {
        logo: "🇶🇦",
        seal: "دولة قطر",
        legalText: " وفقاً لقانون المرافعات المدنية والتجارية لدولة قطر",
        authority: "محاكم قطر",
        stampPosition: "bottom-left",
        signaturePosition: "bottom-right",
      },
      BH: {
        logo: "🇧🇭",
        seal: "مملكة البحرين",
        legalText: " وفقاً لقانون المرافعات المدنية والتجارية لمملكة البحرين",
        authority: "محاكم البحرين",
        stampPosition: "bottom-left",
        signaturePosition: "bottom-right",
      },
      OM: {
        logo: "🇴🇲",
        seal: "سلطنة عُمان",
        legalText: " وفقاً لقانون المرافعات المدنية والتجارية لسلطنة عُمان",
        authority: "محاكم سلطنة عُمان",
        stampPosition: "bottom-left",
        signaturePosition: "bottom-right",
      },
    };

    return elements[countryCode as keyof typeof elements] || elements.SA;
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setContractData({});
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setContractData({ ...contractData, [fieldName]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const template = contractTemplates.find((t) => t.id === selectedTemplate);
    if (!template) return;

    // Validate required fields
    const missingFields = template.fields.filter(
      (field) => field.required && !contractData[field.labelEn]
    );
    if (missingFields.length > 0) {
      toast({
        title: "خطأ في البيانات",
        description: `يرجى ملء جميع الحقول المطلوبة: ${missingFields.map((f) => f.label).join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    const contractPayload = {
      template_id: selectedTemplate,
      template_name: template.name,
      template_name_en: template.nameEn,
      template_category: template.category,
      fields: template.fields,
      contract_data: contractData,
      legal_requirements: template.legalRequirements,
      signature_fields: template.signatureFields,
      country_elements: getCountrySpecificElements(country || "SA"),
      service_type: 'contracts',
    };

    try {
      // Create link in Supabase
      const link = await createLink.mutateAsync({
        type: "contracts",
        country_code: country || "SA",
        payload: contractPayload,
      });

      toast({
        title: "تم إنشاء العقد بنجاح!",
        description: "يمكنك مشاركة الرابط مع الأطراف المعنية",
      });

      // Navigate to microsite
      navigate(link.microsite_url);
    } catch (error) {
      // Error creating contract
      toast({
        title: "خطأ في إنشاء العقد",
        description: "حدث خطأ أثناء إنشاء العقد. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  if (!selectedCountry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>دولة غير صحيحة</p>
      </div>
    );
  }

  const countryElements = getCountrySpecificElements(selectedCountry.code);

  return (
    <div className="min-h-screen py-6" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <BackButton />
        </div>
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(`/services`)}
            className="mb-4"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للخدمات
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, hsl(40 95% 55%), hsl(30 90% 50%))' }}
            >
              <Scale className="w-6 h-6" style={{ color: '#ffffff' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">إدارة وتوثيق العقود الإلكترونية</h1>
              <p className="text-sm text-muted-foreground">
                {selectedCountry.nameAr}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contract Builder */}
          <div className="lg:col-span-2">
            {!selectedTemplate ? (
              <Card className="p-6">
                <h2 className="text-lg font-bold mb-4">اختر نوع العقد</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {contractTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className="p-4 cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <h3 className="font-bold">{template.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">{template.nameEn}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {template.category}
                      </Badge>
                    </Card>
                  ))}
                </div>
              </Card>
            ) : (
              <form onSubmit={handleSubmit}>
                <Card className="p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">
                      {contractTemplates.find((t) => t.id === selectedTemplate)?.name}
                    </h2>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTemplate("")}
                    >
                      تغيير النوع
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {contractTemplates
                      .find((t) => t.id === selectedTemplate)
                      ?.fields.map((field) => (
                        <div
                          key={field.labelEn}
                          className={field.type === "textarea" ? "md:col-span-2" : ""}
                        >
                          <Label htmlFor={field.labelEn}>
                            {field.label} {field.required && "*"}
                          </Label>
                          {field.type === "textarea" ? (
                            <Textarea
                              id={field.labelEn}
                              value={contractData[field.labelEn] || ""}
                              onChange={(e) =>
                                handleFieldChange(field.labelEn, e.target.value)
                              }
                              required={field.required}
                              rows={3}
                            />
                          ) : (
                            <Input
                              id={field.labelEn}
                              type={field.type}
                              value={contractData[field.labelEn] || ""}
                              onChange={(e) =>
                                handleFieldChange(field.labelEn, e.target.value)
                              }
                              required={field.required}
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </Card>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1" size="lg">
                    <Eye className="w-4 h-4 ml-2" />
                    معاينة العقد
                  </Button>
                  <Button type="button" variant="outline" size="lg">
                    <Download className="w-4 h-4 ml-2" />
                    حفظ كمسودة
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Country Elements */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">عناصر الدولة</h2>
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{countryElements.logo}</div>
                <h3 className="font-bold">{countryElements.seal}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">السلطة المختصة:</span>
                  <span className="font-semibold">{countryElements.authority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">موقع الختم:</span>
                  <span className="font-semibold">{countryElements.stampPosition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">موقع التوقيع:</span>
                  <span className="font-semibold">{countryElements.signaturePosition}</span>
                </div>
              </div>
            </Card>

            {/* Legal Requirements */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">المتطلبات القانونية</h2>
              {selectedTemplate ? (
                <ul className="space-y-2">
                  {contractTemplates
                    .find((t) => t.id === selectedTemplate)
                    ?.legalRequirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Stamp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  اختر نوع العقد لعرض المتطلبات القانونية
                </p>
              )}
            </Card>

            {/* Signature Fields */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">حقول التوقيع</h2>
              {selectedTemplate ? (
                <div className="space-y-3">
                  {contractTemplates
                    .find((t) => t.id === selectedTemplate)
                    ?.signatureFields.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <PenTool className="w-4 h-4 text-primary" />
                        <span className="text-sm">
                          {field.includes("client") && "توقيع العميل"}
                          {field.includes("provider") && "توقيع المزود"}
                          {field.includes("witness") && "توقيع الشاهد"}
                          {field.includes("employer") && "توقيع صاحب العمل"}
                          {field.includes("employee") && "توقيع الموظف"}
                          {field.includes("seller") && "توقيع البائع"}
                          {field.includes("buyer") && "توقيع المشتري"}
                          {field.includes("owner") && "توقيع المالك"}
                          {field.includes("tenant") && "توقيع المستأجر"}
                          {field.includes("consultant") && "توقيع المستشار"}
                          {field.includes("hr") && "توقيع الموارد البشرية"}
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  اختر نوع العقد لعرض حقول التوقيع
                </p>
              )}
            </Card>

            {/* Note */}
            <Card 
              className="p-6"
              style={{
                backgroundColor: 'hsl(40 95% 95%)',
                borderColor: 'hsl(40 90% 70%)'
              }}
            >
              <h2 className="text-lg font-bold mb-2" style={{ color: 'hsl(40 90% 35%)' }}>
                ملاحظة مهمة
              </h2>
              <p className="text-sm" style={{ color: 'hsl(40 85% 40%)' }}>
                جميع العقود يتم إنشاؤها وفقاً للأنظمة والقوانين المحلية في {selectedCountry.nameAr}
              </p>
            </Card>
          </div>
        </div>
      </div>
      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default Contracts;
