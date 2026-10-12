import React from 'react';
import {
  Users,
  Car,
  Train,
  MessageSquareText,
  Home,
  Bike,
  TrendingUp,
  Activity,
  CheckCircle2,
  MapPin,
  Zap,
  ShieldCheck,
  FileSpreadsheet,
  Layers,
  Search,
  ChevronRight,
  ArrowRight,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Building2,
  FileText,
  Sliders,
  Check
} from 'lucide-react';

const iconMap = {
  Users,
  Car,
  Train,
  MessageSquareText,
  Home,
  Bike,
  TrendingUp,
  Activity,
  CheckCircle2,
  MapPin,
  Zap,
  ShieldCheck,
  FileSpreadsheet,
  Layers,
  Search,
  ChevronRight,
  ArrowRight,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Building2,
  FileText,
  Sliders,
  Check
};

export default function ServiceIcon({ name, className = 'w-6 h-6', style }) {
  const IconComponent = iconMap[name] || Activity;
  return <IconComponent className={className} style={style} />;
}
