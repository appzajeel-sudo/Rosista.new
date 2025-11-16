"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff, RefreshCw, Database, Monitor, Copy, Check, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataViewerProps {
  fetchedData?: {
    slides?: any[];
    timestamp?: string;
    language?: string;
    cached?: boolean;
  };
  displayedData?: {
    slides?: any[];
    language?: string;
    timestamp?: string;
  };
}

export function DataViewer({ fetchedData, displayedData }: DataViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // تظهر فقط في Development Mode
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      setIsOpen(false);
      return;
    }
    // فتح تلقائياً في Development
    setIsOpen(true);
  }, []);

  // دالة نسخ البيانات
  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  // دالة نسخ كل البيانات مع توضيح المصدر
  const copyAllData = async () => {
    const allData = {
      metadata: {
        timestamp: new Date().toISOString(),
        source: "Data Viewer (Debug)",
        environment: process.env.NODE_ENV,
      },
      fetched: {
        source: "Server Component - fetchHeroSlides()",
        location: "app/page.tsx -> HeroSliderServer -> fetchHeroSlides()",
        description: "البيانات المجلوبة من API في Server Component قبل الترجمة",
        data: fetchedData || null,
      },
      displayed: {
        source: "Client Component - HeroSlider",
        location: "components/hero-slider.tsx -> displaySlides (useMemo)",
        description: "البيانات المعروضة في Client Component بعد الترجمة",
        data: displayedData || null,
      },
    };

    const jsonString = JSON.stringify(allData, null, 2);
    await copyToClipboard(jsonString, "all-data");
  };

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-[9999] h-14 w-14 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-indigo-500/50 hover:scale-110 transition-all duration-300"
        size="icon"
      >
        <Eye className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Card
      className={`fixed top-4 left-4 z-[9999] w-[700px] max-w-[calc(100vw-2rem)] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl transition-all duration-300 backdrop-blur-sm ${
        isMinimized ? "h-14 overflow-hidden" : "h-[85vh] max-h-[85vh] flex flex-col"
      }`}
    >
      {/* Header - Modern Design */}
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 text-white rounded-t-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Data Viewer</h3>
            <p className="text-xs text-white/80">Debug Mode</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20 rounded-lg transition-all"
            onClick={copyAllData}
            title="Copy All Data"
          >
            {copiedKey === "all-data" ? (
              <Check className="h-4 w-4 text-green-300" />
            ) : (
              <Clipboard className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20 rounded-lg transition-all"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20 rounded-lg transition-all"
            onClick={() => {
              window.location.reload();
            }}
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-red-500/50 rounded-lg transition-all"
            onClick={() => setIsOpen(false)}
            title="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <Tabs defaultValue="fetched" className="w-full flex flex-col flex-1 min-h-0">
          <TabsList className="grid w-full grid-cols-2 bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-none border-b border-gray-200 dark:border-gray-700">
            <TabsTrigger 
              value="fetched" 
              className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-800 data-[state=active]:shadow-sm rounded-lg transition-all font-medium"
            >
              <Database className="mr-2 h-4 w-4" />
              Fetched Data
            </TabsTrigger>
            <TabsTrigger 
              value="displayed" 
              className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-800 data-[state=active]:shadow-sm rounded-lg transition-all font-medium"
            >
              <Monitor className="mr-2 h-4 w-4" />
              Displayed Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fetched" className="flex-1 min-h-0 p-0 bg-white/50 dark:bg-gray-900/50 overflow-hidden">
            <div className="h-full overflow-y-auto p-5">
              <div className="space-y-4">
                {/* Language */}
                {fetchedData?.language && (
                  <div className="rounded-xl border border-blue-200/50 dark:border-blue-800/50 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/50 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                        Language
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-blue-900 dark:text-blue-100 ml-4">{fetchedData.language}</div>
                  </div>
                )}

                {/* Cache Status */}
                {fetchedData?.cached !== undefined && (
                  <div className="rounded-xl border border-green-200/50 dark:border-green-800/50 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/50 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${fetchedData.cached ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      <div className="text-xs font-bold text-green-700 dark:text-green-300 uppercase tracking-wider">
                        Cache Status
                      </div>
                    </div>
                    <div className="text-sm ml-4">
                      {fetchedData.cached ? (
                        <span className="inline-flex items-center gap-2 text-green-700 dark:text-green-300 font-semibold px-3 py-1.5 bg-green-100 dark:bg-green-900/50 rounded-lg">
                          <span className="text-lg">✅</span> Cached
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-orange-700 dark:text-orange-300 font-semibold px-3 py-1.5 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                          <span className="text-lg">⚠️</span> Fresh (Not Cached)
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Timestamp */}
                {fetchedData?.timestamp && (
                  <div className="rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      <div className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Timestamp</div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 ml-4 font-mono">
                      {new Date(fetchedData.timestamp).toLocaleString()}
                    </div>
                  </div>
                )}

                {/* Slides */}
                {fetchedData?.slides && (
                  <div className="rounded-xl border border-yellow-200/50 dark:border-yellow-800/50 bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-950/50 dark:to-yellow-900/50 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="text-xs font-bold text-yellow-700 dark:text-yellow-300 uppercase tracking-wider">
                        Slides (Fetched)
                      </div>
                      <span className="ml-auto text-xs font-semibold px-2 py-1 bg-yellow-200 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded-full">
                        {fetchedData.slides.length}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50"
                        onClick={() =>
                          copyToClipboard(
                            JSON.stringify(fetchedData.slides, null, 2),
                            "slides-fetched"
                          )
                        }
                        title="Copy to clipboard"
                      >
                        {copiedKey === "slides-fetched" ? (
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                    <div className="max-h-72 overflow-y-auto overflow-x-auto rounded-lg bg-white/80 dark:bg-gray-900/80 border border-yellow-200/50 dark:border-yellow-800/50 p-3">
                      <pre className="text-xs whitespace-pre-wrap break-words text-yellow-900 dark:text-yellow-100 font-mono leading-relaxed">
                        {JSON.stringify(fetchedData.slides, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {!fetchedData && (
                  <div className="rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 p-8 text-center shadow-sm">
                    <Database className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No fetched data available</p>
                  </div>
                )}
               </div>
             </div>
           </TabsContent>

          <TabsContent value="displayed" className="flex-1 min-h-0 p-0 bg-white/50 dark:bg-gray-900/50 overflow-hidden">
            <div className="h-full overflow-y-auto p-5">
              <div className="space-y-4">
                {/* Language */}
                {displayedData?.language && (
                  <div className="rounded-xl border border-blue-200/50 dark:border-blue-800/50 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/50 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                        Current Language
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-blue-900 dark:text-blue-100 ml-4">{displayedData.language}</div>
                  </div>
                )}

                {/* Timestamp */}
                {displayedData?.timestamp && (
                  <div className="rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      <div className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Timestamp</div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 ml-4 font-mono">
                      {new Date(displayedData.timestamp).toLocaleString()}
                    </div>
                  </div>
                )}

                {/* Displayed Slides */}
                {displayedData?.slides && (
                  <div className="rounded-xl border border-green-200/50 dark:border-green-800/50 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/50 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="text-xs font-bold text-green-700 dark:text-green-300 uppercase tracking-wider">
                        Slides (Displayed)
                      </div>
                      <span className="ml-auto text-xs font-semibold px-2 py-1 bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full">
                        {displayedData.slides.length}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                        onClick={() =>
                          copyToClipboard(
                            JSON.stringify(displayedData.slides, null, 2),
                            "slides-displayed"
                          )
                        }
                        title="Copy to clipboard"
                      >
                        {copiedKey === "slides-displayed" ? (
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                    <div className="max-h-[calc(85vh-280px)] overflow-y-auto overflow-x-auto rounded-lg bg-white/80 dark:bg-gray-900/80 border border-green-200/50 dark:border-green-800/50 p-3">
                      <pre className="text-xs whitespace-pre-wrap break-words text-green-900 dark:text-green-100 font-mono leading-relaxed">
                        {JSON.stringify(displayedData.slides, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {!displayedData && (
                  <div className="rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 p-8 text-center shadow-sm">
                    <Monitor className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No displayed data available</p>
                  </div>
                )}
               </div>
             </div>
           </TabsContent>
        </Tabs>
      )}
    </Card>
  );
}

