import React, { useState, useEffect } from "react";
import { QRHistoryItem } from "../../types";
import { useI18n } from "../../hooks/useI18n";
import { History, Trash2, ArrowUpRight, Clock, Star } from "lucide-react";

interface QRHistoryProps {
  onLoadItem: (item: QRHistoryItem) => void;
  triggerRefresh: boolean; // toggle to signal updates from parent
}

export default function QRHistory({ onLoadItem, triggerRefresh }: QRHistoryProps) {
  const { t } = useI18n();
  const [history, setHistory] = useState<QRHistoryItem[]>([]);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem("qrify_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      } else {
        setHistory([]);
      }
    } catch {
      setHistory([]);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [triggerRefresh]);

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const stored = localStorage.getItem("qrify_history");
      if (stored) {
        const list: QRHistoryItem[] = JSON.parse(stored);
        const filtered = list.filter((item) => item.id !== id);
        localStorage.setItem("qrify_history", JSON.stringify(filtered));
        setHistory(filtered);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear your local QR code history cache?")) {
      localStorage.removeItem("qrify_history");
      setHistory([]);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-bold tracking-wider text-slate-800 uppercase font-mono">
            {t("qr_history")}
          </h3>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            onClick={handleClearHistory}
            className="text-xs font-semibold uppercase tracking-wider text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg border border-transparent hover:border-red-100 transition-all cursor-pointer"
            id="clear-all-history-btn"
          >
            Clear Cache
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => onLoadItem(item)}
              className="flex items-center justify-between p-3 border border-slate-150 hover:border-blue-400 rounded-xl bg-slate-50/50 hover:bg-blue-50/10 cursor-pointer transition-all group"
              id={`history-item-${item.id}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-150 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-blue-600 fill-blue-50" />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-xs font-bold text-slate-800 block truncate leading-tight">
                    {item.label || `Saved QR Template (${item.type.replace(/_/g, " ")})`}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-slate-200/60 text-slate-600 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded">
                      {item.type.replace(/_/g, " ")}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="p-1.5 border border-slate-200 group-hover:border-blue-300 text-slate-400 group-hover:text-blue-600 rounded-lg bg-white transition-all shadow-sm">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
                <button
                  type="button"
                  onClick={(e) => handleDeleteItem(item.id, e)}
                  className="p-1.5 border border-transparent hover:border-red-200 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white transition-all"
                  title="Remove template"
                  id={`delete-history-${item.id}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed border-slate-250 rounded-xl bg-slate-50/30">
          <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-500 leading-normal max-w-xs mx-auto">
            {t("no_history")}
          </p>
        </div>
      )}
    </div>
  );
}
