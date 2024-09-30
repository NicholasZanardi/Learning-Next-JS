import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SaleForm({ isEdit, existingSale }) {
  const [itemId, setItemId] = useState(existingSale?.itemId || '');
  const [quantity, setQuantity] = useState(existingSale?.quantity || 0);
  const [saleDate, setSaleDate] = useState(existingSale?.saleDate || '');
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch all items to populate the item dropdown
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/sales/${existingSale.id}` : `/api/sales`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId: parseInt(itemId), quantity: parseInt(quantity), saleDate }),
    });

    router.push('/');
  };

  return (
    <div>
      <h1>{isEdit ? 'Edit Sale' : 'Add Sale'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item</label>
          <select value={itemId} onChange={(e) => setItemId(e.target.value)}>
            <option value="" disabled>Select an item</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div>
          <label>Sale Date</label>
          <input type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} />
        </div>
        <br/>
        <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}
