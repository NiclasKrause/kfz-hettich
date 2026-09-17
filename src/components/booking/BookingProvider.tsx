"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type BookingService = "HU" | "AU";

interface BookingContextValue {
  isOpen: boolean;
  initialService: BookingService;
  openBooking: (service?: BookingService) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialService, setInitialService] = useState<BookingService>("HU");

  const value = useMemo<BookingContextValue>(
    () => ({
      isOpen,
      initialService,
      openBooking: (service = "HU") => {
        setInitialService(service);
        setIsOpen(true);
      },
      closeBooking: () => setIsOpen(false),
    }),
    [isOpen, initialService],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
