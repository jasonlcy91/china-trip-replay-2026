/**
 * MediaPanel — Shows current moment's caption, meal info, and highlight
 * Design: Topographic Narrative — editorial card with terrain accent
 */
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Star, Quote } from "lucide-react";
import type { Moment } from "@/data/trip";

interface MediaPanelProps {
  moment: Moment;
}

const CATEGORY_LABELS: Record<string, string> = {
  nature: "自然",
  food: "美食",
  water: "水景",
  history: "人文",
  transport: "交通",
  accommodation: "住宿",
};

const CATEGORY_BG: Record<string, string> = {
  nature: "bg-terrain-forest/10 border-terrain-forest/20",
  food: "bg-terrain-amber/10 border-terrain-amber/20",
  water: "bg-terrain-water/10 border-terrain-water/20",
  history: "bg-terrain-stone/10 border-terrain-stone/20",
  transport: "bg-muted/50 border-border/30",
  accommodation: "bg-terrain-amber/10 border-terrain-amber/20",
};

const CATEGORY_DOT: Record<string, string> = {
  nature: "bg-terrain-forest",
  food: "bg-terrain-amber",
  water: "bg-terrain-water",
  history: "bg-terrain-stone",
  transport: "bg-muted-foreground",
  accommodation: "bg-terrain-amber",
};

export default function MediaPanel({ moment }: MediaPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={moment.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className="px-4 py-3"
      >
        <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl p-4 shadow-sm">
          {/* Category + time row */}
          <div className="flex items-center gap-2 mb-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-[var(--font-mono)] uppercase tracking-wider border ${CATEGORY_BG[moment.category]}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${CATEGORY_DOT[moment.category]}`} />
              <span className="text-foreground/80">{CATEGORY_LABELS[moment.category]}</span>
            </span>
            <span className="text-[10px] font-[var(--font-mono)] text-muted-foreground/60 ml-auto">
              {moment.timeLabel}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-[22px] font-[var(--font-display)] font-bold text-foreground leading-tight tracking-tight">
            {moment.title}
          </h2>
          {moment.subtitle && (
            <p className="text-[13px] text-muted-foreground mt-0.5 font-light">
              {moment.subtitle}
            </p>
          )}

          {/* Caption */}
          <div className="mt-3 flex items-start gap-2">
            <Quote className="w-3 h-3 text-muted-foreground/40 mt-1 flex-shrink-0 rotate-180" />
            <p className="text-[14px] text-foreground/75 leading-relaxed">
              {moment.caption}
            </p>
          </div>

          {/* Meal card */}
          {moment.meal && (
            <div className="mt-3 flex items-center gap-2.5 px-3 py-2.5 bg-terrain-amber/8 rounded-lg border border-terrain-amber/15">
              <div className="w-7 h-7 rounded-full bg-terrain-amber/15 flex items-center justify-center flex-shrink-0">
                <Utensils className="w-3.5 h-3.5 text-terrain-amber" />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-foreground truncate">
                  {moment.meal.name}
                </p>
                {moment.meal.restaurant && (
                  <p className="text-[10px] text-muted-foreground truncate">
                    {moment.meal.restaurant}
                  </p>
                )}
              </div>
              <span className="text-[9px] font-[var(--font-mono)] text-terrain-amber/60 uppercase ml-auto flex-shrink-0">
                {moment.meal.type}
              </span>
            </div>
          )}

          {/* Highlight */}
          {moment.highlight && (
            <div className="mt-2 flex items-center gap-2.5 px-3 py-2 bg-terrain-water/8 rounded-lg border border-terrain-water/15">
              <Star className="w-3.5 h-3.5 text-terrain-water flex-shrink-0" />
              <span className="text-[12px] text-foreground/80">{moment.highlight}</span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
