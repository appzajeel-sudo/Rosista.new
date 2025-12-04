"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Toggle } from "@/components/ui/toggle";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar } from "@/components/ui/calendar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { toast as sonnerToast } from "sonner";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  Mail,
  Lock,
  User,
  ShoppingBag,
  Settings,
  Bell,
  HelpCircle,
  MoreVertical,
  Download,
  Copy,
  Trash2,
  Edit,
  Heart,
  Bold,
  Italic,
  Underline,
  ChevronDown,
  Menu,
  Search,
  Home,
  Package,
  Users,
  FileText,
  Image,
  Music,
  Video,
  Calendar as CalendarIcon,
  Inbox,
  Send,
  Eye,
  EyeOff,
  Globe,
  PanelLeft,
  LayoutDashboard,
  ShoppingCart,
  Users as UsersIcon,
  Settings as SettingsIcon,
  FileText as FileTextIcon,
  BarChart3,
  CreditCard,
  Plus,
} from "lucide-react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "يجب أن يكون اسم المستخدم على الأقل حرفين.",
  }),
  email: z.string().email({
    message: "يجب أن يكون بريد إلكتروني صحيح.",
  }),
});

export default function UIShowcasePage() {
  const [checked, setChecked] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [progress, setProgress] = useState(33);
  const [sliderValue, setSliderValue] = useState([50]);
  const [isOpen, setIsOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const chartData = [
    { name: "يناير", value: 400 },
    { name: "فبراير", value: 300 },
    { name: "مارس", value: 200 },
    { name: "أبريل", value: 278 },
    { name: "مايو", value: 189 },
  ];

  const chartConfig = {
    value: {
      label: "المبيعات",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <>
      <Toaster />
      <SonnerToaster />
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              UI Components Showcase
            </h1>
            <p className="text-muted-foreground text-lg">
              عرض جميع مكونات UI المتاحة في المشروع
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* 1. Button Component */}
            <Card>
              <CardHeader>
                <CardTitle>Button</CardTitle>
                <CardDescription>أزرار بأشكال وأحجام مختلفة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <ShoppingBag />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 2. Card Component */}
            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>
                <CardDescription>بطاقات لعرض المحتوى</CardDescription>
              </CardHeader>
              <CardContent>
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">مثال على Card</CardTitle>
                    <CardDescription>
                      هذا مثال على استخدام مكون Card
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      محتوى البطاقة يظهر هنا
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">إجراء</Button>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>

            {/* 3. Input Component */}
            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
                <CardDescription>حقول إدخال النصوص</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input type="text" placeholder="أدخل النص هنا" />
                <Input type="email" placeholder="البريد الإلكتروني" />
                <Input type="password" placeholder="كلمة المرور" />
                <Input type="text" disabled placeholder="معطل" />
              </CardContent>
            </Card>

            {/* 4. Textarea Component */}
            <Card>
              <CardHeader>
                <CardTitle>Textarea</CardTitle>
                <CardDescription>حقل إدخال متعدد الأسطر</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="اكتب رسالتك هنا..."
                  rows={4}
                  className="resize-none"
                />
              </CardContent>
            </Card>

            {/* 5. Badge Component */}
            <Card>
              <CardHeader>
                <CardTitle>Badge</CardTitle>
                <CardDescription>شارات بألوان مختلفة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </CardContent>
            </Card>

            {/* 6. Alert Component */}
            <Card>
              <CardHeader>
                <CardTitle>Alert</CardTitle>
                <CardDescription>تنبيهات وإشعارات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>معلومة</AlertTitle>
                  <AlertDescription>هذا تنبيه معلوماتي عادي</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>خطأ</AlertTitle>
                  <AlertDescription>هذا تنبيه خطأ</AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* 7. Checkbox Component */}
            <Card>
              <CardHeader>
                <CardTitle>Checkbox</CardTitle>
                <CardDescription>مربعات اختيار</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="terms"
                    checked={checked}
                    onCheckedChange={(checked) => setChecked(checked === true)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    أوافق على الشروط والأحكام
                  </label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="newsletter" defaultChecked />
                  <label
                    htmlFor="newsletter"
                    className="text-sm font-bold leading-none"
                  >
                    الاشتراك في النشرة الإخبارية
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* 8. Switch Component */}
            <Card>
              <CardHeader>
                <CardTitle>Switch</CardTitle>
                <CardDescription>مفاتيح تبديل</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold">تفعيل الإشعارات</label>
                  <Switch checked={switched} onCheckedChange={setSwitched} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold">الوضع الليلي</label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* 9. Tabs Component */}
            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
                <CardDescription>تبويبات للتنقل</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">الحساب</TabsTrigger>
                    <TabsTrigger value="settings">الإعدادات</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="mt-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold">معلومات الحساب</h3>
                      <p className="text-sm text-muted-foreground">
                        إدارة معلومات حسابك هنا
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="settings" className="mt-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold">الإعدادات</h3>
                      <p className="text-sm text-muted-foreground">
                        تعديل إعداداتك هنا
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* 10. Dialog Component */}
            <Card>
              <CardHeader>
                <CardTitle>Dialog</CardTitle>
                <CardDescription>نوافذ حوار منبثقة</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">فتح Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>هل أنت متأكد؟</DialogTitle>
                      <DialogDescription>
                        هذا الإجراء لا يمكن التراجع عنه. سيتم حذف حسابك نهائياً
                        وإزالة بياناتك من خوادمنا.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">إلغاء</Button>
                      <Button variant="destructive">حذف</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* 11. Select Component */}
            <Card>
              <CardHeader>
                <CardTitle>Select</CardTitle>
                <CardDescription>قوائم منسدلة للاختيار</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر خيار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">الخيار الأول</SelectItem>
                    <SelectItem value="option2">الخيار الثاني</SelectItem>
                    <SelectItem value="option3">الخيار الثالث</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="option2">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">عربي</SelectItem>
                    <SelectItem value="option2">English</SelectItem>
                    <SelectItem value="option3">Français</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* 12. Radio Group Component */}
            <Card>
              <CardHeader>
                <CardTitle>Radio Group</CardTitle>
                <CardDescription>أزرار اختيار دائري</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="option1">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="option1" id="r1" />
                    <Label htmlFor="r1">الخيار الأول</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="option2" id="r2" />
                    <Label htmlFor="r2">الخيار الثاني</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="option3" id="r3" />
                    <Label htmlFor="r3">الخيار الثالث</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* 13. Progress Component */}
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
                <CardDescription>شريط تقدم</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>التقدم</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    -10%
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    +10%
                  </Button>
                </div>
                <Progress value={75} className="h-3" />
                <Progress value={50} className="h-1" />
              </CardContent>
            </Card>

            {/* 14. Skeleton Component */}
            <Card>
              <CardHeader>
                <CardTitle>Skeleton</CardTitle>
                <CardDescription>عناصر تحميل مؤقتة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
                <Skeleton className="h-32 w-full rounded-lg" />
              </CardContent>
            </Card>

            {/* 15. Popover Component */}
            <Card>
              <CardHeader>
                <CardTitle>Popover</CardTitle>
                <CardDescription>نوافذ منبثقة صغيرة</CardDescription>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">فتح Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-bold leading-none">إعدادات</h4>
                      <p className="text-sm text-muted-foreground">
                        قم بتعديل الإعدادات من هنا
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* 16. Tooltip Component */}
            <Card>
              <CardHeader>
                <CardTitle>Tooltip</CardTitle>
                <CardDescription>تلميحات عند التمرير</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">تمرير هنا</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>هذا تلميح مفيد</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <HelpCircle />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>معلومات إضافية</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge>تمرير</Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>تلميح على Badge</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>

            {/* 17. Accordion Component */}
            <Card>
              <CardHeader>
                <CardTitle>Accordion</CardTitle>
                <CardDescription>قوائم قابلة للطي</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>ما هو ROSISTA؟</AccordionTrigger>
                    <AccordionContent>
                      ROSISTA هي منصة للهدايا الفاخرة والمنتجات المميزة
                      للمناسبات الخاصة.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>كيف يمكنني الطلب؟</AccordionTrigger>
                    <AccordionContent>
                      يمكنك تصفح المنتجات وإضافة ما تريد إلى السلة ثم إتمام
                      عملية الشراء.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>ما هي طرق الدفع؟</AccordionTrigger>
                    <AccordionContent>
                      نقبل الدفع بالبطاقات الائتمانية والدفع عند الاستلام.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* 18. Avatar Component */}
            <Card>
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>صور المستخدمين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="https://github.com/vercel.png" />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>RO</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">RS</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            {/* 19. Slider Component */}
            <Card>
              <CardHeader>
                <CardTitle>Slider</CardTitle>
                <CardDescription>شريط تمرير للقيم</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label>الحجم</Label>
                    <span>{sliderValue[0]}</span>
                  </div>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label>السعر</Label>
                  <Slider defaultValue={[25, 75]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                  <Label>مستوى الصوت</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>

            {/* 20. Label Component */}
            <Card>
              <CardHeader>
                <CardTitle>Label</CardTitle>
                <CardDescription>تسميات للحقول</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">تذكرني</Label>
                </div>
              </CardContent>
            </Card>

            {/* 21. Dropdown Menu Component */}
            <Card>
              <CardHeader>
                <CardTitle>Dropdown Menu</CardTitle>
                <CardDescription>قوائم منسدلة تفاعلية</CardDescription>
              </CardHeader>
              <CardContent>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>الملف الشخصي</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>الإعدادات</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>حذف</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>

            {/* 22. Sheet Component */}
            <Card>
              <CardHeader>
                <CardTitle>Sheet</CardTitle>
                <CardDescription>لوحات جانبية منبثقة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">فتح من اليمين</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>إعدادات</SheetTitle>
                        <SheetDescription>
                          قم بتعديل إعداداتك هنا. انقر خارج النافذة للإغلاق.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <Label>الاسم</Label>
                          <Input placeholder="أدخل اسمك" />
                        </div>
                        <div className="space-y-2">
                          <Label>البريد الإلكتروني</Label>
                          <Input type="email" placeholder="email@example.com" />
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">فتح من اليسار</Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>القائمة</SheetTitle>
                        <SheetDescription>قائمة التنقل</SheetDescription>
                      </SheetHeader>
                      <div className="mt-4 space-y-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <Home className="mr-2 h-4 w-4" />
                          الرئيسية
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <Package className="mr-2 h-4 w-4" />
                          المنتجات
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <Users className="mr-2 h-4 w-4" />
                          العملاء
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </CardContent>
            </Card>

            {/* 23. Table Component */}
            <Card>
              <CardHeader>
                <CardTitle>Table</CardTitle>
                <CardDescription>جداول البيانات</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>قائمة المنتجات</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المنتج</TableHead>
                      <TableHead>السعر</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold">
                        صندوق شوكولاتة
                      </TableCell>
                      <TableCell>299 ر.س</TableCell>
                      <TableCell>
                        <Badge variant="secondary">متوفر</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">باقة ورد</TableCell>
                      <TableCell>450 ر.س</TableCell>
                      <TableCell>
                        <Badge variant="secondary">متوفر</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">عطر فاخر</TableCell>
                      <TableCell>850 ر.س</TableCell>
                      <TableCell>
                        <Badge variant="destructive">غير متوفر</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 24. Toast Component */}
            <Card>
              <CardHeader>
                <CardTitle>Toast</CardTitle>
                <CardDescription>إشعارات منبثقة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "تم الحفظ",
                        description: "تم حفظ التغييرات بنجاح",
                      });
                    }}
                  >
                    إشعار عادي
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "خطأ",
                        description: "حدث خطأ أثناء المعالجة",
                        variant: "destructive",
                      });
                    }}
                  >
                    إشعار خطأ
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "نجاح",
                        description: "تمت العملية بنجاح",
                      });
                    }}
                  >
                    إشعار نجاح
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 25. Toggle Component */}
            <Card>
              <CardHeader>
                <CardTitle>Toggle</CardTitle>
                <CardDescription>أزرار تبديل</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Toggle aria-label="Toggle bold">
                    <Bold className="h-4 w-4" />
                  </Toggle>
                  <Toggle aria-label="Toggle italic">
                    <Italic className="h-4 w-4" />
                  </Toggle>
                  <Toggle aria-label="Toggle underline">
                    <Underline className="h-4 w-4" />
                  </Toggle>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-2">
                  <Toggle variant="outline" aria-label="Toggle bold">
                    <Bold className="h-4 w-4" />
                  </Toggle>
                  <Toggle variant="outline" aria-label="Toggle italic">
                    <Italic className="h-4 w-4" />
                  </Toggle>
                  <Toggle variant="outline" aria-label="Toggle underline">
                    <Underline className="h-4 w-4" />
                  </Toggle>
                </div>
              </CardContent>
            </Card>

            {/* 26. Collapsible Component */}
            <Card>
              <CardHeader>
                <CardTitle>Collapsible</CardTitle>
                <CardDescription>عناصر قابلة للطي</CardDescription>
              </CardHeader>
              <CardContent>
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                  <div className="flex items-center justify-between space-x-4">
                    <h4 className="text-sm font-bold">
                      @peduarte قام بتحديث ملفاتك
                    </h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="space-y-2 mt-2">
                    <div className="rounded-md border px-4 py-2 text-sm">
                      تم تحديث الملفات التالية: package.json, tsconfig.json
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>

            {/* 27. Pagination Component */}
            <Card>
              <CardHeader>
                <CardTitle>Pagination</CardTitle>
                <CardDescription>ترقيم الصفحات</CardDescription>
              </CardHeader>
              <CardContent>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>

            {/* 28. Breadcrumb Component */}
            <Card>
              <CardHeader>
                <CardTitle>Breadcrumb</CardTitle>
                <CardDescription>مسار التنقل</CardDescription>
              </CardHeader>
              <CardContent>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">الرئيسية</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">المنتجات</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>المناسبات</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </CardContent>
            </Card>

            {/* 29. Command Component */}
            <Card>
              <CardHeader>
                <CardTitle>Command</CardTitle>
                <CardDescription>لوحة الأوامر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => setCommandOpen(true)}
                    className="w-full"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    فتح Command Palette
                  </Button>
                  <CommandDialog
                    open={commandOpen}
                    onOpenChange={setCommandOpen}
                  >
                    <CommandInput placeholder="اكتب أمراً أو ابحث..." />
                    <CommandList>
                      <CommandEmpty>لا توجد نتائج.</CommandEmpty>
                      <CommandGroup heading="الاقتراحات">
                        <CommandItem>
                          <Home className="mr-2 h-4 w-4" />
                          <span>الرئيسية</span>
                        </CommandItem>
                        <CommandItem>
                          <Package className="mr-2 h-4 w-4" />
                          <span>المنتجات</span>
                        </CommandItem>
                        <CommandItem>
                          <Users className="mr-2 h-4 w-4" />
                          <span>العملاء</span>
                        </CommandItem>
                      </CommandGroup>
                      <CommandGroup heading="الإعدادات">
                        <CommandItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>الإعدادات</span>
                        </CommandItem>
                        <CommandItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>الملف الشخصي</span>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </CommandDialog>
                </div>
              </CardContent>
            </Card>

            {/* 30. Hover Card Component */}
            <Card>
              <CardHeader>
                <CardTitle>Hover Card</CardTitle>
                <CardDescription>بطاقات عند التمرير</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">@rosista</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/vercel.png" />
                          <AvatarFallback>RO</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold">@rosista</h4>
                          <p className="text-sm">
                            منصة ROSISTA للهدايا الفاخرة والمنتجات المميزة
                          </p>
                          <div className="flex items-center pt-2">
                            <User className="mr-2 h-4 w-4 opacity-70" />
                            <span className="text-xs text-muted-foreground">
                              متابع من يناير 2024
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Badge variant="outline">تمرير هنا</Badge>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold">معلومات إضافية</h4>
                        <p className="text-sm text-muted-foreground">
                          هذا مثال على Hover Card مع محتوى بسيط
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </CardContent>
            </Card>

            {/* 31. Alert Dialog Component */}
            <Card>
              <CardHeader>
                <CardTitle>Alert Dialog</CardTitle>
                <CardDescription>نوافذ حوار تحذيرية</CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">حذف الحساب</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>هل أنت متأكد تماماً؟</AlertDialogTitle>
                      <AlertDialogDescription>
                        هذا الإجراء لا يمكن التراجع عنه. سيتم حذف حسابك نهائياً
                        وإزالة جميع بياناتك من خوادمنا.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <AlertDialogAction>نعم، احذف الحساب</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            {/* 33. Context Menu Component */}
            <Card>
              <CardHeader>
                <CardTitle>Context Menu</CardTitle>
                <CardDescription>قائمة عند النقر بالزر الأيمن</CardDescription>
              </CardHeader>
              <CardContent>
                <ContextMenu>
                  <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                    انقر بالزر الأيمن هنا
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-64">
                    <ContextMenuLabel>حسابي</ContextMenuLabel>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>الملف الشخصي</span>
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>الإعدادات</span>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>حذف</span>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </CardContent>
            </Card>

            {/* 34. Menubar Component */}
            <Card>
              <CardHeader>
                <CardTitle>Menubar</CardTitle>
                <CardDescription>شريط قوائم</CardDescription>
              </CardHeader>
              <CardContent>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>الملف</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>مستند جديد</span>
                      </MenubarItem>
                      <MenubarItem>
                        <span>فتح</span>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>
                        <span>حفظ</span>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>تحرير</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <span>تراجع</span>
                      </MenubarItem>
                      <MenubarItem>
                        <span>إعادة</span>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>عرض</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <span>تكبير</span>
                      </MenubarItem>
                      <MenubarItem>
                        <span>تصغير</span>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </CardContent>
            </Card>

            {/* 35. Navigation Menu Component */}
            <Card>
              <CardHeader>
                <CardTitle>Navigation Menu</CardTitle>
                <CardDescription>قائمة تنقل تفاعلية</CardDescription>
              </CardHeader>
              <CardContent>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>المنتجات</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px]">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-bold leading-none">
                              الشوكولاتة
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              مجموعة واسعة من الشوكولاتة الفاخرة
                            </p>
                          </NavigationMenuLink>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-bold leading-none">
                              الورود
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              باقات ورد جميلة ومنسقة
                            </p>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>المناسبات</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px]">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-bold leading-none">
                              أعياد الميلاد
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              هدايا مميزة لأعياد الميلاد
                            </p>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </CardContent>
            </Card>

            {/* 36. Resizable Component */}
            <Card>
              <CardHeader>
                <CardTitle>Resizable</CardTitle>
                <CardDescription>لوحات قابلة لتغيير الحجم</CardDescription>
              </CardHeader>
              <CardContent>
                <ResizablePanelGroup
                  direction="horizontal"
                  className="min-h-[200px] rounded-lg border"
                >
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="font-bold">اللوحة الأولى</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="font-bold">اللوحة الثانية</span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </CardContent>
            </Card>

            {/* 37. Carousel Component */}
            <Card>
              <CardHeader>
                <CardTitle>Carousel</CardTitle>
                <CardDescription>عرض شرائحي</CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-4xl font-bold">
                                {index + 1}
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>

            {/* 38. Calendar Component */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>تقويم</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" className="rounded-md border" />
              </CardContent>
            </Card>

            {/* 39. Aspect Ratio Component */}
            <Card>
              <CardHeader>
                <CardTitle>Aspect Ratio</CardTitle>
                <CardDescription>نسبة العرض إلى الارتفاع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AspectRatio
                    ratio={16 / 9}
                    className="bg-muted rounded-md overflow-hidden"
                  >
                    <div className="flex items-center justify-center h-full">
                      <span className="text-sm text-muted-foreground">
                        16:9
                      </span>
                    </div>
                  </AspectRatio>
                  <AspectRatio
                    ratio={4 / 3}
                    className="bg-muted rounded-md overflow-hidden"
                  >
                    <div className="flex items-center justify-center h-full">
                      <span className="text-sm text-muted-foreground">4:3</span>
                    </div>
                  </AspectRatio>
                  <AspectRatio
                    ratio={1 / 1}
                    className="bg-muted rounded-md overflow-hidden"
                  >
                    <div className="flex items-center justify-center h-full">
                      <span className="text-sm text-muted-foreground">1:1</span>
                    </div>
                  </AspectRatio>
                </div>
              </CardContent>
            </Card>

            {/* 40. KBD, Empty, Spinner Components */}
            <Card>
              <CardHeader>
                <CardTitle>KBD, Empty, Spinner</CardTitle>
                <CardDescription>مكونات مساعدة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>KBD (Keyboard)</Label>
                  <div className="flex flex-wrap gap-2">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                    <KbdGroup>
                      <Kbd>Ctrl</Kbd>
                      <Kbd>+</Kbd>
                      <Kbd>C</Kbd>
                    </KbdGroup>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Spinner</Label>
                  <div className="flex items-center gap-4">
                    <Spinner />
                    <Spinner className="h-6 w-6" />
                    <Spinner className="h-8 w-8" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Empty State</Label>
                  <Empty>
                    <EmptyMedia>
                      <Inbox className="h-12 w-12 text-muted-foreground" />
                    </EmptyMedia>
                    <EmptyHeader>
                      <EmptyTitle>لا توجد عناصر</EmptyTitle>
                      <EmptyDescription>
                        لا توجد عناصر لعرضها في الوقت الحالي.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </div>
              </CardContent>
            </Card>

            {/* 41. Form Component */}
            <Card>
              <CardHeader>
                <CardTitle>Form</CardTitle>
                <CardDescription>نماذج مع التحقق</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((data) => {
                      toast({
                        title: "تم الإرسال بنجاح",
                        description: JSON.stringify(data),
                      });
                    })}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اسم المستخدم</FormLabel>
                          <FormControl>
                            <Input placeholder="اسم المستخدم" {...field} />
                          </FormControl>
                          <FormDescription>
                            هذا هو اسم المستخدم الذي سيظهر للآخرين.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البريد الإلكتروني</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">إرسال</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* 42. Input OTP Component */}
            <Card>
              <CardHeader>
                <CardTitle>Input OTP</CardTitle>
                <CardDescription>إدخال رمز OTP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>رمز التحقق</Label>
                    <InputOTP
                      maxLength={6}
                      value={otpValue}
                      onChange={(value) => setOtpValue(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    أدخل رمز التحقق المكون من 6 أرقام
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 43. Input Group Component */}
            <Card>
              <CardHeader>
                <CardTitle>Input Group</CardTitle>
                <CardDescription>مجموعات إدخال مع إضافات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <InputGroup>
                  <InputGroupAddon>
                    <Mail className="h-4 w-4" />
                  </InputGroupAddon>
                  <InputGroupInput placeholder="البريد الإلكتروني" />
                </InputGroup>
                <InputGroup>
                  <InputGroupInput placeholder="البحث..." />
                  <InputGroupAddon align="inline-end">
                    <Search className="h-4 w-4" />
                  </InputGroupAddon>
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="example.com" />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton>
                      <Copy className="h-4 w-4" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </CardContent>
            </Card>

            {/* 44. Button Group Component */}
            <Card>
              <CardHeader>
                <CardTitle>Button Group</CardTitle>
                <CardDescription>مجموعات أزرار</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ButtonGroup>
                  <Button variant="outline">يسار</Button>
                  <Button variant="outline">وسط</Button>
                  <Button variant="outline">يمين</Button>
                </ButtonGroup>
                <ButtonGroup orientation="vertical">
                  <Button variant="outline">أعلى</Button>
                  <Button variant="outline">وسط</Button>
                  <Button variant="outline">أسفل</Button>
                </ButtonGroup>
              </CardContent>
            </Card>

            {/* 45. Toggle Group Component */}
            <Card>
              <CardHeader>
                <CardTitle>Toggle Group</CardTitle>
                <CardDescription>مجموعات تبديل</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ToggleGroup type="single">
                  <ToggleGroupItem value="left" aria-label="يسار">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="center" aria-label="وسط">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="right" aria-label="يمين">
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup type="multiple" variant="outline">
                  <ToggleGroupItem value="bold" aria-label="عريض">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="مائل">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline" aria-label="تحته خط">
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </CardContent>
            </Card>

            {/* 46. Sonner (Toast) Component */}
            <Card>
              <CardHeader>
                <CardTitle>Sonner (Toast)</CardTitle>
                <CardDescription>إشعارات محسّنة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      sonnerToast.success("تم الحفظ بنجاح!", {
                        description: "تم حفظ التغييرات بنجاح",
                      })
                    }
                  >
                    نجاح
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      sonnerToast.error("حدث خطأ!", {
                        description: "حدث خطأ أثناء المعالجة",
                      })
                    }
                  >
                    خطأ
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      sonnerToast.info("معلومة", {
                        description: "هذه معلومة مهمة",
                      })
                    }
                  >
                    معلومة
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      sonnerToast.warning("تحذير", {
                        description: "يرجى الانتباه",
                      })
                    }
                  >
                    تحذير
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 47. Chart Component */}
            <Card>
              <CardHeader>
                <CardTitle>Chart</CardTitle>
                <CardDescription>رسوم بيانية</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--color-value)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* 48. Field Component */}
            <Card>
              <CardHeader>
                <CardTitle>Field</CardTitle>
                <CardDescription>حقول نماذج منظمة</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>اسم المستخدم</FieldLabel>
                    <FieldContent>
                      <Input placeholder="أدخل اسم المستخدم" />
                      <FieldDescription>
                        هذا هو اسم المستخدم الذي سيظهر للآخرين
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                  <Field orientation="horizontal">
                    <FieldLabel>البريد الإلكتروني</FieldLabel>
                    <FieldContent>
                      <Input type="email" placeholder="email@example.com" />
                    </FieldContent>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* 49. Item Component */}
            <Card>
              <CardHeader>
                <CardTitle>Item</CardTitle>
                <CardDescription>عناصر قوائم</CardDescription>
              </CardHeader>
              <CardContent>
                <ItemGroup>
                  <Item>
                    <ItemMedia variant="icon">
                      <Package className="h-4 w-4" />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>منتج 1</ItemTitle>
                      <ItemDescription>
                        وصف المنتج الأول مع تفاصيل إضافية
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </ItemActions>
                  </Item>
                  <Item>
                    <ItemMedia variant="icon">
                      <ShoppingBag className="h-4 w-4" />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>منتج 2</ItemTitle>
                      <ItemDescription>
                        وصف المنتج الثاني مع تفاصيل إضافية
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </ItemActions>
                  </Item>
                </ItemGroup>
              </CardContent>
            </Card>

            {/* 50. Language Switcher Component */}
            <Card>
              <CardHeader>
                <CardTitle>Language Switcher</CardTitle>
                <CardDescription>مبدل اللغة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <LanguageSwitcher />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span>اضغط للتبديل بين العربية والإنجليزية</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 51-58. Sidebar Component with Sub-components */}
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Sidebar (51-58)</CardTitle>
                <CardDescription>
                  شريط جانبي مع جميع المكونات الفرعية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <SidebarProvider>
                    <div className="flex h-[600px]">
                      <Sidebar variant="sidebar" collapsible="icon">
                        <SidebarHeader>
                          <div className="flex items-center gap-2 px-2 py-1.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                              <ShoppingBag className="h-4 w-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                              <span className="truncate font-bold">
                                ROSISTA
                              </span>
                              <span className="truncate text-xs">
                                منصة الهدايا
                              </span>
                            </div>
                          </div>
                        </SidebarHeader>
                        <SidebarContent>
                          <SidebarGroup>
                            <SidebarGroupLabel>
                              القائمة الرئيسية
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                              <SidebarMenu>
                                <SidebarMenuItem>
                                  <SidebarMenuButton asChild>
                                    <a href="#">
                                      <LayoutDashboard className="h-4 w-4" />
                                      <span>لوحة التحكم</span>
                                    </a>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                  <SidebarMenuButton asChild>
                                    <a href="#">
                                      <ShoppingCart className="h-4 w-4" />
                                      <span>المنتجات</span>
                                      <SidebarMenuBadge>12</SidebarMenuBadge>
                                    </a>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                  <SidebarMenuButton asChild>
                                    <a href="#">
                                      <UsersIcon className="h-4 w-4" />
                                      <span>العملاء</span>
                                    </a>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                  <Collapsible>
                                    <SidebarMenuButton asChild>
                                      <CollapsibleTrigger>
                                        <FileTextIcon className="h-4 w-4" />
                                        <span>التقارير</span>
                                        <ChevronDown className="ml-auto h-4 w-4" />
                                      </CollapsibleTrigger>
                                    </SidebarMenuButton>
                                    <CollapsibleContent>
                                      <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                          <SidebarMenuSubButton asChild>
                                            <a href="#">
                                              <BarChart3 className="h-4 w-4" />
                                              <span>المبيعات</span>
                                            </a>
                                          </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                          <SidebarMenuSubButton asChild>
                                            <a href="#">
                                              <CreditCard className="h-4 w-4" />
                                              <span>المدفوعات</span>
                                            </a>
                                          </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                      </SidebarMenuSub>
                                    </CollapsibleContent>
                                  </Collapsible>
                                </SidebarMenuItem>
                              </SidebarMenu>
                            </SidebarGroupContent>
                          </SidebarGroup>
                          <SidebarSeparator />
                          <SidebarGroup>
                            <SidebarGroupLabel>
                              الإعدادات
                              <SidebarGroupAction asChild>
                                <Button size="icon" variant="ghost">
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </SidebarGroupAction>
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                              <SidebarMenu>
                                <SidebarMenuItem>
                                  <SidebarMenuButton asChild>
                                    <a href="#">
                                      <SettingsIcon className="h-4 w-4" />
                                      <span>الإعدادات</span>
                                    </a>
                                  </SidebarMenuButton>
                                  <SidebarMenuAction>
                                    <Button size="icon" variant="ghost">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </SidebarMenuAction>
                                </SidebarMenuItem>
                              </SidebarMenu>
                            </SidebarGroupContent>
                          </SidebarGroup>
                        </SidebarContent>
                        <SidebarFooter>
                          <SidebarMenu>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <a href="#">
                                  <User className="h-4 w-4" />
                                  <span>الملف الشخصي</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarFooter>
                        <SidebarRail />
                      </Sidebar>
                      <SidebarInset>
                        <div className="flex h-full flex-col gap-4 p-4">
                          <div className="flex items-center gap-2">
                            <SidebarTrigger />
                            <h2 className="text-lg font-bold">محتوى الصفحة</h2>
                          </div>
                          <div className="flex-1 rounded-lg border border-dashed p-8">
                            <p className="text-sm text-muted-foreground">
                              هذا هو محتوى الصفحة الرئيسية. استخدم زر Sidebar
                              Trigger لإظهار/إخفاء الشريط الجانبي.
                            </p>
                            <div className="mt-4 space-y-2">
                              <p className="text-sm font-bold">
                                المكونات الفرعية المعروضة:
                              </p>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                <li>SidebarProvider (51)</li>
                                <li>Sidebar (52)</li>
                                <li>SidebarHeader (53)</li>
                                <li>SidebarContent (54)</li>
                                <li>SidebarGroup (55)</li>
                                <li>SidebarMenu (56)</li>
                                <li>SidebarMenuButton (57)</li>
                                <li>SidebarFooter (58)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </SidebarInset>
                    </div>
                  </SidebarProvider>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              تم عرض جميع المكونات UI المتاحة (58 مكون)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
