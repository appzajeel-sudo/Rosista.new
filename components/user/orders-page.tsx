"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  Eye,
  RotateCcw,
  Calendar,
  MapPin,
  Phone,
  Star,
  Filter,
  Search,
  ShoppingBag,
  CreditCard,
  AlertCircle,
  ChevronDown,
  X,
  Gift,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Order } from "@/types/user";
import { getOrdersAction } from "@/app/actions/user";

export function OrdersPage() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      try {
        const ordersData = await getOrdersAction();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error loading orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const getStatusInfo = (status: Order["status"]) => {
    const statusMap = {
      pending: {
        label: t("orders.status.pending"),
        color: "text-yellow-700 bg-yellow-100 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-900/50",
        icon: <Clock size={16} />,
        bgGradient: "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10",
      },
      processing: {
        label: t("orders.status.processing"),
        color: "text-blue-700 bg-blue-100 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-900/50",
        icon: <Package size={16} />,
        bgGradient: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10",
      },
      shipped: {
        label: t("orders.status.shipped"),
        color: "text-primary-700 bg-primary-100 border-primary-200 dark:text-primary-400 dark:bg-primary-900/20 dark:border-primary-900/50",
        icon: <Truck size={16} />,
        bgGradient: "from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/10",
      },
      delivered: {
        label: t("orders.status.delivered"),
        color: "text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-900/50",
        icon: <CheckCircle size={16} />,
        bgGradient: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10",
      },
      cancelled: {
        label: t("orders.status.cancelled"),
        color: "text-red-700 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-900/50",
        icon: <RotateCcw size={16} />,
        bgGradient: "from-red-50 to-secondary-50 dark:from-red-900/20 dark:to-secondary-900/10",
      },
    };
    return statusMap[status];
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesStatus && matchesSearch;
  });

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full mb-6 shadow-lg">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-neutral-900 dark:text-white leading-tight">
            {t("orders.title")}
          </h1>
          <p className="mt-2.5 text-sm sm:text-base max-w-xs sm:max-w-md md:max-w-lg mx-auto leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t("orders.subtitle")}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-900 dark:text-white text-sm font-medium mb-1">
                  {t("orders.stats.totalOrders")}
                </p>
                <p className="text-2xl font-bold text-primary-800 dark:text-primary-400">
                  {orders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-900 dark:text-white text-sm font-medium mb-1">
                  {t("orders.stats.delivered")}
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {orders.filter((o) => o.status === "delivered").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-900 dark:text-white text-sm font-medium mb-1">
                  {t("orders.stats.processing")}
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {
                    orders.filter(
                      (o) => o.status === "processing" || o.status === "shipped"
                    ).length
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-900 dark:text-white text-sm font-medium mb-1">
                  {t("orders.stats.totalSpent")}
                </p>
                <p className="text-2xl font-bold text-primary-800 dark:text-primary-400">
                  {orders.reduce((sum, order) => sum + order.total, 0)}{" "}
                  {isRtl ? "ر.س" : "SAR"}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 mb-8 border border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-neutral-400"
              />
              <input
                type="text"
                placeholder={t("orders.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Filter size={18} className="text-primary-600 dark:text-primary-400" />
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-800 pr-10 font-medium text-neutral-900 dark:text-white"
                >
                  <option value="all">{t("orders.filters.all")}</option>
                  <option value="pending">{t("orders.filters.pending")}</option>
                  <option value="processing">
                    {t("orders.filters.processing")}
                  </option>
                  <option value="shipped">{t("orders.filters.shipped")}</option>
                  <option value="delivered">
                    {t("orders.filters.delivered")}
                  </option>
                  <option value="cancelled">
                    {t("orders.filters.cancelled")}
                  </option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {filteredOrders.length > 0 && (
            <div className="mt-4 text-sm text-neutral-900 dark:text-white text-center">
              {isRtl ? "عرض" : "Showing"}{" "}
              <span className="font-bold text-primary-600 dark:text-primary-400">
                {filteredOrders.length}
              </span>{" "}
              {isRtl ? "من" : "of"}{" "}
              <span className="font-bold">{orders.length}</span>{" "}
              {isRtl ? "طلب" : "orders"}
            </div>
          )}
        </motion.div>

        {/* Orders List */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-neutral-900 dark:text-white font-medium">
              {isRtl ? "جاري تحميل الطلبات..." : "Loading orders..."}
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-gradient-to-r from-primary-200 to-secondary-200 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={48} className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              {searchTerm || filterStatus !== "all"
                ? t("orders.noResults")
                : t("orders.noOrders")}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto text-lg leading-relaxed">
              {searchTerm || filterStatus !== "all"
                ? isRtl
                  ? "لا توجد طلبات تطابق معايير البحث. جرب تعديل الفلاتر."
                  : "No orders match your search criteria. Try adjusting the filters."
                : isRtl
                  ? "لم تقم بأي طلبات بعد. ابدأ في اكتشاف هداياً رائعة!"
                  : "You haven't placed any orders yet. Start discovering amazing gifts!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(searchTerm || filterStatus !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                  className="inline-flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white px-6 py-3 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all shadow-md font-medium"
                >
                  <X size={18} />
                  {t("orders.clearFilters")}
                </button>
              )}
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-white px-6 py-3 rounded-xl hover:from-primary-700 hover:to-secondary-600 transition-all shadow-lg font-medium"
              >
                <Gift size={18} />
                <span>{t("orders.startShopping")}</span>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => {
              const statusInfo = getStatusInfo(order.status);
              const isExpanded = expandedOrder === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Order Header */}
                  <div
                    className={`bg-gradient-to-r ${statusInfo.bgGradient} p-6 border-b border-neutral-200 dark:border-neutral-800`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-neutral-800 rounded-full shadow-md flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                            {t("orders.orderNumber")} {order.orderNumber}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>
                                {(() => {
                                  const date = new Date(order.date);
                                  const day = String(
                                    date.getUTCDate()
                                  ).padStart(2, "0");
                                  const month = String(
                                    date.getUTCMonth() + 1
                                  ).padStart(2, "0");
                                  const year = date.getUTCFullYear();
                                  return `${day}/${month}/${year}`;
                                })()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Package size={14} />
                              <span>
                                {order.items.length} {t("orders.items")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div
                          className={`flex items-center gap-2 px-4 py-2 rounded-full border ${statusInfo.color}`}
                        >
                          {statusInfo.icon}
                          <span className="font-medium text-sm">
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="text-right rtl:text-left">
                          <div className="text-xl font-bold text-primary-800 dark:text-primary-400">
                            {order.total} {isRtl ? "ر.س" : "SAR"}
                          </div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400">
                            {t("orders.taxIncluded")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                        <Gift size={16} className="text-primary-600 dark:text-primary-400" />
                        {t("orders.items")}
                      </h4>
                      <button
                        onClick={() => toggleOrderExpansion(order.id)}
                        className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors"
                      >
                        <span>
                          {isExpanded
                            ? t("orders.hideDetails")
                            : t("orders.viewDetails")}
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </button>
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {order.items
                        .slice(0, isExpanded ? order.items.length : 3)
                        .map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-all"
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-neutral-900 dark:text-white text-sm line-clamp-2">
                                {item.name}
                              </h5>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-primary-600 dark:text-primary-400 font-bold text-sm">
                                  {item.price} {isRtl ? "ر.س" : "SAR"}
                                </p>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-700 px-2 py-1 rounded-full">
                                  {isRtl ? "الكمية:" : "Qty:"} {item.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}

                      {!isExpanded && order.items.length > 3 && (
                        <div className="flex items-center justify-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 border-dashed">
                          <span className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
                            +{order.items.length - 3}{" "}
                            {isRtl ? "منتج آخر" : "more items"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Shipping Information */}
                              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900/50">
                                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
                                  <MapPin size={18} />
                                  {t("orders.shippingInfo")}
                                </h4>
                                <div className="space-y-3 text-sm">
                                  <div className="flex items-center gap-3">
                                    <User size={16} className="text-blue-600 dark:text-blue-400" />
                                    <span className="font-medium text-neutral-900 dark:text-white">
                                      {order.shippingAddress.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Phone
                                      size={16}
                                      className="text-blue-600 dark:text-blue-400"
                                    />
                                    <span className="text-neutral-700 dark:text-neutral-300">
                                      {order.shippingAddress.phone}
                                    </span>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <MapPin
                                      size={16}
                                      className="text-blue-600 dark:text-blue-400 mt-0.5"
                                    />
                                    <div>
                                      <p className="text-neutral-700 dark:text-neutral-300">
                                        {order.shippingAddress.address}
                                      </p>
                                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                                        {order.shippingAddress.city}
                                      </p>
                                    </div>
                                  </div>
                                  {order.trackingNumber && (
                                    <div className="flex items-center gap-3 pt-2 border-t border-blue-200 dark:border-blue-900/50">
                                      <Truck
                                        size={16}
                                        className="text-blue-600 dark:text-blue-400"
                                      />
                                      <div>
                                        <p className="font-medium text-blue-800 dark:text-blue-200">
                                          {t("orders.trackingNumber")}:
                                        </p>
                                        <p className="font-mono text-blue-600 dark:text-blue-400">
                                          {order.trackingNumber}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Order Summary */}
                              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 border border-primary-100 dark:border-primary-900/50">
                                <h4 className="font-semibold text-primary-800 dark:text-primary-200 mb-4 flex items-center gap-2">
                                  <CreditCard size={18} />
                                  {isRtl ? "ملخص الطلب" : "Order Summary"}
                                </h4>
                                <div className="space-y-3 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-neutral-900 dark:text-white">
                                      {t("orders.subtotal")}:
                                    </span>
                                    <span className="font-medium">
                                      {(order.total * 0.86).toFixed(2)}{" "}
                                      {isRtl ? "ر.س" : "SAR"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-neutral-900 dark:text-white">
                                      {t("orders.tax")}:
                                    </span>
                                    <span className="font-medium">
                                      {(order.total * 0.14).toFixed(2)}{" "}
                                      {isRtl ? "ر.س" : "SAR"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-neutral-900 dark:text-white">
                                      {t("orders.shipping")}:
                                    </span>
                                    <span className="font-medium text-green-600 dark:text-green-400">
                                      {isRtl ? "مجاني" : "Free"}
                                    </span>
                                  </div>
                                  <div className="border-t border-primary-200 dark:border-primary-900/50 pt-3">
                                    <div className="flex justify-between">
                                      <span className="font-bold text-primary-800 dark:text-primary-200">
                                        {t("orders.total")}:
                                      </span>
                                      <span className="font-bold text-primary-800 dark:text-primary-200 text-lg">
                                        {order.total} {isRtl ? "ر.س" : "SAR"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                      <button
                        onClick={() => toggleOrderExpansion(order.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-xl hover:bg-primary-200 dark:hover:bg-primary-900/30 transition-all shadow-sm font-medium"
                      >
                        <Eye size={16} />
                        <span>
                          {isExpanded
                            ? t("orders.actions.hide")
                            : t("orders.actions.view")}
                        </span>
                      </button>

                      {order.trackingNumber && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-all shadow-sm font-medium">
                          <Truck size={16} />
                          <span>{t("orders.actions.track")}</span>
                        </button>
                      )}

                      {order.status === "delivered" && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-xl hover:bg-amber-200 dark:hover:bg-amber-900/30 transition-all shadow-sm font-medium">
                          <Star size={16} />
                          <span>{t("orders.actions.rate")}</span>
                        </button>
                      )}

                      {(order.status === "pending" ||
                        order.status === "processing") && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/30 transition-all shadow-sm font-medium">
                          <RotateCcw size={16} />
                          <span>{t("orders.actions.cancel")}</span>
                        </button>
                      )}

                      <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all shadow-sm font-medium">
                        <Package size={16} />
                        <span>{t("orders.actions.reorder")}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 border border-neutral-200 dark:border-neutral-800 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              {t("orders.needHelp")}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              {t("orders.helpMessage")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg font-medium"
              >
                <Phone size={18} />
                <span>{t("orders.contactUs")}</span>
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white px-6 py-3 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all shadow-md font-medium"
              >
                <AlertCircle size={18} />
                <span>{t("orders.faq")}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

