import type { CSSProperties } from "react";
import type { OrderSummary } from "@/types/order";
import { formatCurrency } from "@/lib/utils/formatCurrency";

interface InvoiceProps {
  order: OrderSummary;
  compact?: boolean;
}

function getStyles(compact: boolean) {
  return {
    wrapper: {
      width: "100%",
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: compact ? "12px" : "16px",
      padding: compact ? "16px" : "40px",
      color: "#111827",
      fontFamily: "Inter, Roboto, Arial, sans-serif",
    } satisfies CSSProperties,
    header: {
      display: "flex",
      flexDirection: compact ? "column" : "row",
      justifyContent: "space-between",
      gap: compact ? "16px" : "24px",
      alignItems: compact ? "flex-start" : "center",
      paddingBottom: compact ? "16px" : "24px",
      borderBottom: "1px solid #e5e7eb",
    } satisfies CSSProperties,
    eyebrow: {
      fontSize: "12px",
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "#dc2626",
      margin: 0,
    } satisfies CSSProperties,
    brand: {
      fontSize: compact ? "24px" : "36px",
      margin: "4px 0",
      fontWeight: 800,
      lineHeight: 1.2,
      color: "#111827",
      letterSpacing: "-0.02em",
    } satisfies CSSProperties,
    sub: {
      margin: 0,
      color: "#6b7280",
      fontSize: compact ? "12px" : "15px",
    } satisfies CSSProperties,
    meta: {
      fontSize: compact ? "12px" : "15px",
      color: "#6b7280",
      lineHeight: 1.7,
      textAlign: compact ? "left" : "right",
    } satisfies CSSProperties,
    metaLabel: {
      color: "#111827",
      fontWeight: 600,
    } satisfies CSSProperties,
    section: {
      marginTop: compact ? "24px" : "32px",
      backgroundColor: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: compact ? "16px" : "28px",
    } satisfies CSSProperties,
    sectionTitle: {
      margin: 0,
      fontSize: "12px",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#dc2626",
      marginBottom: "16px",
    } satisfies CSSProperties,
    detailGrid: {
      display: "grid",
      gridTemplateColumns: compact ? "1fr" : "1fr 1fr",
      gap: compact ? "12px" : "16px",
      fontSize: compact ? "13px" : "15px",
      color: "#4b5563",
      lineHeight: 1.6,
    } satisfies CSSProperties,
    itemsTitle: {
      marginTop: compact ? "24px" : "40px",
      marginBottom: "16px",
      fontSize: "12px",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#6b7280",
    } satisfies CSSProperties,
    tableWrap: {
      width: "100%",
      overflowX: "auto", // Allow table to scroll horizontally if absolutely needed on very small devices
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      backgroundColor: "#ffffff",
    } satisfies CSSProperties,
    table: {
      width: "100%",
      minWidth: compact ? "320px" : "auto", // Ensure columns don't crush to 0
      borderCollapse: "collapse",
      tableLayout: compact ? "auto" : "fixed",
      fontSize: compact ? "12px" : "15px",
    } satisfies CSSProperties,
    thead: {
      backgroundColor: "#f3f4f6",
      color: "#111827",
    } satisfies CSSProperties,
    th: {
      padding: compact ? "10px 12px" : "16px 20px",
      textAlign: "left",
      borderBottom: "1px solid #e5e7eb",
      fontWeight: 600,
    } satisfies CSSProperties,
    td: {
      padding: compact ? "10px 12px" : "16px 20px",
      borderBottom: "1px solid #e5e7eb",
      color: "#4b5563",
      wordBreak: compact ? "break-word" : "normal",
    } satisfies CSSProperties,
    footer: {
      marginTop: compact ? "24px" : "32px",
      paddingTop: compact ? "16px" : "24px",
      borderTop: "1px solid #e5e7eb",
    } satisfies CSSProperties,
    totalRow: {
      display: "flex",
      justifyContent: compact ? "space-between" : "flex-end",
      gap: compact ? "0" : "24px",
      alignItems: "center",
      fontSize: compact ? "18px" : "24px",
      fontWeight: 800,
      color: "#111827",
    } satisfies CSSProperties,
    totalLabel: {
      color: "#4b5563",
      fontWeight: 500,
      fontSize: compact ? "14px" : "16px",
    } satisfies CSSProperties,
    codNote: {
      marginTop: compact ? "16px" : "24px",
      backgroundColor: "#fef2f2",
      border: "1px solid #fecaca",
      borderRadius: "12px",
      padding: compact ? "12px" : "16px",
      fontSize: compact ? "12px" : "14px",
      color: "#991b1b",
      lineHeight: 1.5,
      textAlign: compact ? "left" : "center",
      fontWeight: 500,
    } satisfies CSSProperties,
  } as const;
}

export function Invoice({ order, compact = false }: InvoiceProps) {
  const styles = getStyles(compact);
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article style={styles.wrapper}>
      <header style={styles.header}>
        <div>
          <p style={styles.eyebrow}>Receipt</p>
          <h2 style={styles.brand}>ShopVerse</h2>
          <p style={styles.sub}>Official Cash on Delivery Invoice</p>
        </div>

        <div style={styles.meta}>
          <div>
            <span style={styles.metaLabel}>Order ID:</span> {order.orderId}
          </div>
          <div style={{ marginTop: "4px" }}>
            <span style={styles.metaLabel}>Date:</span> {orderDate}
          </div>
        </div>
      </header>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Customer Details</h3>
        <div style={styles.detailGrid}>
          <div>
            <div style={styles.metaLabel}>Name</div>
            <div style={{ marginTop: "2px" }}>{order.customer.fullName}</div>
          </div>
          <div>
            <div style={styles.metaLabel}>Phone</div>
            <div style={{ marginTop: "2px" }}>{order.customer.phoneNumber}</div>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={styles.metaLabel}>Delivery Address</div>
            <div style={{ marginTop: "2px" }}>{order.customer.address}</div>
          </div>
          {order.customer.note ? (
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={styles.metaLabel}>Delivery Note</div>
              <div style={{ marginTop: "2px" }}>{order.customer.note}</div>
            </div>
          ) : null}
        </div>
      </section>

      <h3 style={styles.itemsTitle}>Order Summary</h3>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Price</th>
              <th style={{ ...styles.th, textAlign: "right" }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={item.id}>
                <td style={{ ...styles.td, borderBottom: index === order.items.length - 1 ? 0 : styles.td.borderBottom }}>
                  {item.name}
                </td>
                <td style={{ ...styles.td, borderBottom: index === order.items.length - 1 ? 0 : styles.td.borderBottom }}>
                  {item.quantity}
                </td>
                <td style={{ ...styles.td, borderBottom: index === order.items.length - 1 ? 0 : styles.td.borderBottom }}>
                  {formatCurrency(item.price)}
                </td>
                <td
                  style={{
                    ...styles.td,
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#111827",
                    borderBottom: index === order.items.length - 1 ? 0 : styles.td.borderBottom,
                  }}
                >
                  {formatCurrency(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer style={styles.footer}>
        <div style={styles.totalRow}>
          <span style={styles.totalLabel}>Total Payable</span>
          <span>{formatCurrency(order.totalPrice)}</span>
        </div>
        <p style={styles.codNote}>
          Payment Method: Cash on Delivery. Please keep the exact amount ready upon delivery.
        </p>
      </footer>
    </article>
  );
}
