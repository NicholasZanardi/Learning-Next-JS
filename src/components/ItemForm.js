import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ItemForm({ isEdit, existingItem }) {
  const [name, setName] = useState(existingItem?.name || '');
  const [stock, setStock] = useState(existingItem?.stock || 0);
  const [type, setType] = useState(existingItem?.type || '');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/items/${existingItem.id}` : '/api/items';
  
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, stock: Number(stock), type }),
    });
  
    // Optional: add some feedback for the user
    alert(isEdit ? 'Item updated successfully!' : 'Item added successfully!');
  
    router.push('/');
  };

  return (
    <div>
      <h1>{isEdit ? 'Edit Item' : 'Add Item'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Barang</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Stok</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>
        <div>
          <label>Jenis Barang</label>
          <input value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <br/>
        <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}
