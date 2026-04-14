import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

export interface ServiceData {
    name: string;
    description: string;
    icon: React.ReactNode;
    detailTitle?: string;
    detailDescription?: string;
    benefits?: string[];
}

interface ServiceModalProps {
    service: ServiceData | null;
    isOpen: boolean;
    onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
    if (!service) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="relative p-6 sm:p-8 border-b border-slate-800 bg-slate-900/50">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                                aria-label="Cerrar modal"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-4 pr-8">
                                <div className="p-3 rounded-xl bg-slate-800/80 text-mindwave-lime border border-slate-700/50 shadow-lg shadow-mindwave-lime/10">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white leading-tight">
                                    {service.name}
                                </h3>
                            </div>
                        </div>

                        {/* Content (Scrollable) */}
                        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                            <div className="space-y-8">
                                {/* Main Value Proposition */}
                                <div>
                                    <h4 className="text-sm font-semibold text-mindwave-lime uppercase tracking-wider mb-3">
                                        La Solución
                                    </h4>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        {service.detailDescription || service.description}
                                    </p>
                                </div>

                                {/* Benefits List */}
                                {service.benefits && service.benefits.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-semibold text-mindwave-lime uppercase tracking-wider mb-4">
                                            Beneficios Clave
                                        </h4>
                                        <ul className="grid sm:grid-cols-2 gap-4">
                                            {service.benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-mindwave-lime shrink-0 mt-0.5" />
                                                    <span className="text-slate-300 text-sm leading-snug">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors border border-slate-700"
                            >
                                Cerrar
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;
