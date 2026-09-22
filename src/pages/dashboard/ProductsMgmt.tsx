import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, Check, Package, Sparkles } from "lucide-react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import DataTable, { Column } from "../../components/DataTable";
import { PRODUCTS, Product } from "../../data/products";

interface ProductRow extends Product {
  stock: number;
}

export const ProductsMgmt: React.FC = () => {
  const [products, setProducts] = useState<ProductRow[]>(() =>
    PRODUCTS.map((p, idx) => ({
      ...p,
      stock: (idx + 1) * 32 + 14,
    }))
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal form states
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<"Classic" | "Zero" | "Flavors">("Classic");
  const [formPrice, setFormPrice] = useState("2.49");
  const [formStock, setFormStock] = useState("100");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDelete = (id: string, name: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Removed "${name}" from store inventory.`);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert("Please provide a product title.");
      return;
    }

    const newProd: ProductRow = {
      id: `custom_${Date.now()}`,
      name: formName.trim(),
      description: "Custom administrative catalog listing created in the educational dashboard.",
      price: parseFloat(formPrice || "2.49"),
      category: formCategory,
      badge: "New Release",
      rating: 5.0,
      inStock: true,
      nutrition: {
        calories: 140,
        sugar: "39g",
        caffeine: "34mg",
      },
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
      stock: parseInt(formStock || "100", 10),
    };

    setProducts([newProd, ...products]);
    setModalOpen(false);
    setFormName("");
    showToast(`Product "${newProd.name}" added to catalog.`);
  };

  const columns: Column<ProductRow>[] = [
    {
      header: "Product",
      accessor: "name",
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-medium text-white block">{p.name}</span>
            <span className="text-xs text-white/50">{p.badge || p.category}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
      render: (p) => (
        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
          {p.category}
        </span>
      ),
    },
    {
      header: "Price",
      accessor: "price",
      align: "right",
      render: (p) => (
        <span className="font-mono text-white font-medium">
          ${p.price.toFixed(2)}
        </span>
      ),
    },
    {
      header: "In Stock",
      accessor: "stock",
      align: "right",
      render: (p) => (
        <span className="font-mono text-xs font-semibold text-white/90">
          {p.stock} units
        </span>
      ),
    },
    {
      header: "Actions",
      align: "right",
      render: (p) => (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => showToast(`Edit modal triggered for "${p.name}".`)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Edit product"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(p.id, p.name)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/70 hover:text-[#F40009] transition-colors cursor-pointer"
            aria-label="Delete product"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F40009]">
            Administrative Operations
          </span>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mt-1">
            Product Catalog
          </h2>
          <p className="text-xs md:text-sm text-white/60 mt-0.5">
            Manage global beverage SKUs, price indexing, inventory allotments, and retail statuses.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4 mr-1.5" />}
          onClick={() => setModalOpen(true)}
        >
          Add Product
        </Button>
      </div>

      {/* Product Table */}
      <DataTable
        id="products-management-table"
        columns={columns}
        data={products}
        keyExtractor={(p) => p.id}
      />

      {/* Add Product Modal (Form-only, no persistence needed) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0F0F0F] border border-white/10 p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="text-xl font-medium text-white tracking-tight">Add New Beverage SKU</h3>
                <p className="text-xs text-white/50 mt-0.5">Mock inventory configuration</p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-white/70 font-medium mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Coca-Cola Spiced Raspberry"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F40009]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-white/70 font-medium mb-1.5">
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as "Classic" | "Zero" | "Flavors")}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F40009]"
                >
                  <option value="Classic">Classic</option>
                  <option value="Zero">Zero Sugar</option>
                  <option value="Flavors">Flavors</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-white/70 font-medium mb-1.5">
                    Retail Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#F40009]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-white/70 font-medium mb-1.5">
                    Opening Stock
                  </label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#F40009]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Save to Catalog
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsMgmt;
