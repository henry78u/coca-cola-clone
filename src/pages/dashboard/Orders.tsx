import React, { useState } from "react";
import { ShoppingBag, Search, CheckCircle2, Clock, Truck, XCircle } from "lucide-react";
import Card from "../../components/Card";
import DataTable, { Column } from "../../components/DataTable";
import { ORDERS, OrderItem } from "../../data/orders";

export const Orders: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Pending" | "Shipped" | "Delivered" | "Cancelled"
  >("All");
  const [search, setSearch] = useState("");

  const filteredOrders = ORDERS.filter((ord) => {
    const matchesStatus =
      statusFilter === "All" || ord.status === statusFilter;
    const matchesSearch =
      ord.id.toLowerCase().includes(search.toLowerCase()) ||
      ord.customer.toLowerCase().includes(search.toLowerCase()) ||
      ord.email.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const columns: Column<OrderItem>[] = [
    {
      header: "Order ID",
      accessor: "id",
      render: (ord) => (
        <span className="font-mono font-medium text-white">{ord.id}</span>
      ),
    },
    {
      header: "Customer",
      accessor: "customer",
      render: (ord) => (
        <div>
          <span className="font-medium text-white block">{ord.customer}</span>
          <span className="text-xs text-white/50">{ord.email}</span>
        </div>
      ),
    },
    {
      header: "Date Placed",
      accessor: "date",
      render: (ord) => <span className="text-white/70">{ord.date}</span>,
    },
    {
      header: "Units",
      accessor: "itemsCount",
      align: "center",
      render: (ord) => <span className="text-white/80">{ord.itemsCount} pk</span>,
    },
    {
      header: "Total",
      accessor: "total",
      align: "right",
      render: (ord) => (
        <span className="font-mono font-semibold text-white">
          ${ord.total.toFixed(2)}
        </span>
      ),
    },
    {
      header: "Fulfillment Status",
      accessor: "status",
      align: "right",
      render: (ord) => {
        let badgeColor = "bg-white/5 text-white/70 border-white/10";
        let Icon = Clock;

        if (ord.status === "Delivered") {
          badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
          Icon = CheckCircle2;
        } else if (ord.status === "Shipped") {
          badgeColor = "bg-sky-500/10 text-sky-400 border-sky-500/20";
          Icon = Truck;
        } else if (ord.status === "Pending") {
          badgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
          Icon = Clock;
        } else if (ord.status === "Cancelled") {
          badgeColor = "bg-[#F40009]/10 text-[#F40009] border-[#F40009]/20";
          Icon = XCircle;
        }

        return (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badgeColor}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{ord.status}</span>
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F40009]">
            Administrative Logistics
          </span>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mt-1">
            Customer Orders ({filteredOrders.length})
          </h2>
          <p className="text-xs md:text-sm text-white/60 mt-0.5">
            Real-time fulfillment tracking, payment verification, and delivery dispatch statuses.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#F40009]"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 overflow-x-auto max-w-full">
        {(["All", "Pending", "Shipped", "Delivered", "Cancelled"] as const).map(
          (status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === status
                  ? "bg-[#F40009] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* Orders Table */}
      <DataTable
        id="orders-management-table"
        columns={columns}
        data={filteredOrders}
        keyExtractor={(ord) => ord.id}
      />
    </div>
  );
};

export default Orders;
