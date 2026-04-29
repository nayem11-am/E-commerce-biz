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
      overflowX: "hidden",
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "16px",
      padding: compact ? "16px" : "28px",
      color: "#0f172a",
      fontFamily: "Arial, Helvetica, sans-serif",
    } satisfies CSSProperties,
    header: {
      display: "flex",
      justifyContent: "space-between",
      gap: "16px",
      alignItems: "flex-start",
      paddingBottom: "16px",
      borderBottom: "1px solid #e2e8f0",
      flexWrap: "wrap",
    } satisfies CSSProperties,
  eyebrow: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#475569",
    margin: 0,
  } satisfies CSSProperties,
    brand: {
      fontSize: compact ? "24px" : "30px",
    margin: "8px 0 4px 0",
    fontWeight: 700,
    lineHeight: 1.2,
    } satisfies CSSProperties,
    sub: {
      margin: 0,
      color: "#475569",
      fontSize: compact ? "12px" : "14px",
    } satisfies CSSProperties,
    meta: {
      fontSize: compact ? "12px" : "14px",
      color: "#334155",
      lineHeight: 1.7,
    } satisfies CSSProperties,
    section: {
      marginTop: "20px",
      backgroundColor: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: compact ? "12px" : "14px",
    } satisfies CSSProperties,
  sectionTitle: {
    margin: 0,
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#334155",
  } satisfies CSSProperties,
    detailBlock: {
      marginTop: "10px",
      fontSize: compact ? "12px" : "14px",
      color: "#334155",
      lineHeight: 1.7,
    } satisfies CSSProperties,
  itemsTitle: {
    marginTop: "22px",
    marginBottom: "10px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#334155",
  } satisfies CSSProperties,
    tableWrap: {
      width: "100%",
      overflowX: "hidden",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
    } satisfies CSSProperties,
    table: {
      width: "100%",
      borderCollapse: "collapse",
      tableLayout: "fixed",
      fontSize: compact ? "12px" : "14px",
    } satisfies CSSProperties,
  thead: {
    backgroundColor: "#f8fafc",
    color: "#334155",
  } satisfies CSSProperties,
    th: {
      padding: compact ? "8px 8px" : "10px 12px",
      textAlign: "left",
      borderBottom: "1px solid #e2e8f0",
      fontWeight: 700,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    } satisfies CSSProperties,
    td: {
      padding: compact ? "8px 8px" : "10px 12px",
      borderBottom: "1px solid #e2e8f0",
      color: "#334155",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    } satisfies CSSProperties,
  footer: {
    marginTop: "18px",
    paddingTop: "14px",
    borderTop: "1px solid #e2e8f0",
  } satisfies CSSProperties,
    totalRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: compact ? "16px" : "18px",
      fontWeight: 700,
    } satisfies CSSProperties,
    codNote: {
      marginTop: "12px",
      backgroundColor: "#ecfdf5",
      border: "1px solid #a7f3d0",
      borderRadius: "10px",
      padding: "10px 12px",
      fontSize: compact ? "12px" : "13px",
      color: "#065f46",
      lineHeight: 1.6,
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
          <p style={styles.eyebrow}>Invoice</p>
          <h2 style={styles.brand}>ShopVerse</h2>
          <p style={styles.sub}>Cash on Delivery Order Invoice</p>
        </div>

        <div style={styles.meta}>
          <div>
            <strong>Order ID:</strong> {order.orderId}
          </div>
          <div>
            <strong>Order Date:</strong> {orderDate}
          </div>
        </div>
      </header>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Customer Details</h3>
        <div style={styles.detailBlock}>
          <div>
            <strong>Name:</strong> {order.customer.fullName}
          </div>
          <div>
            <strong>Phone:</strong> {order.customer.phoneNumber}
          </div>
          <div>
            <strong>Address:</strong> {order.customer.address}
          </div>
          {order.customer.note ? (
            <div>
              <strong>Note:</strong> {order.customer.note}
            </div>
          ) : null}
        </div>
      </section>

      <h3 style={styles.itemsTitle}>Ordered Items</h3>
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
                    color: "#0f172a",
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
          <span>Total Price</span>
          <span>{formatCurrency(order.totalPrice)}</span>
        </div>
        <p style={styles.codNote}>
          Payment Method: Cash on Delivery. Please keep the exact amount ready at delivery.
        </p>
      </footer>
    </article>
  );
}
