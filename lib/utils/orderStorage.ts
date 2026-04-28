import type { OrderSummary } from "@/types/order";

const LAST_ORDER_STORAGE_KEY = "shopverse_last_order_v1";
const LAST_ORDER_EVENT = "shopverse:last-order-changed";

let cachedRaw: string | null | undefined;
let cachedOrder: OrderSummary | null = null;

function parseOrder(raw: string | null): OrderSummary | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<OrderSummary>;
    if (
      typeof parsed.orderId !== "string" ||
      !Array.isArray(parsed.items) ||
      typeof parsed.totalPrice !== "number" ||
      typeof parsed.createdAt !== "string" ||
      !parsed.customer ||
      typeof parsed.customer !== "object" ||
      typeof parsed.customer.fullName !== "string" ||
      typeof parsed.customer.phoneNumber !== "string" ||
      typeof parsed.customer.address !== "string"
    ) {
      return null;
    }

    return parsed as OrderSummary;
  } catch {
    return null;
  }
}

export function writeLastOrderToStorage(order: OrderSummary) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(order);
  window.localStorage.setItem(LAST_ORDER_STORAGE_KEY, raw);
  cachedRaw = raw;
  cachedOrder = order;
  window.dispatchEvent(new Event(LAST_ORDER_EVENT));
}

export function readLastOrderFromStorage(): OrderSummary | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(LAST_ORDER_STORAGE_KEY);
  if (raw === cachedRaw) return cachedOrder;

  cachedRaw = raw;
  cachedOrder = parseOrder(raw);
  return cachedOrder;
}

export function subscribeLastOrder(listener: () => void) {
  if (typeof window === "undefined") return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === LAST_ORDER_STORAGE_KEY) listener();
  };
  const onOrderChange = () => listener();

  window.addEventListener("storage", onStorage);
  window.addEventListener(LAST_ORDER_EVENT, onOrderChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(LAST_ORDER_EVENT, onOrderChange);
  };
}

export function getLastOrderServerSnapshot(): OrderSummary | null {
  return null;
}
