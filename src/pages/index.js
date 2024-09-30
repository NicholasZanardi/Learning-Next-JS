import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => setItems(data));

    fetch('/api/sales')
      .then((res) => res.json())
      .then((data) => {
        console.log('Sales Data:', data); // Debug: Pastikan data di sini
        setSales(data);
      });
  }, []);

  const deleteItem = async (id) => {
    await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });
    setItems(items.filter((item) => item.id !== id));
  };

  const deleteSale = async (id) => {
    await fetch(`/api/sales/${id}`, { method: 'DELETE' });
    setSales(sales.filter((sale) => sale.id !== id));
  };

  return (
    <div>
      <h1>Data Barang</h1>
      <table border="1">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Barang</th>
            <th>Stok</th>
            <th>Jenis Barang</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.type}</td>
              <td>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
                <button onClick={() => window.location.href = `/edit-item/${item.id}`}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Data Penjualan</h1>
      <table border="1">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Barang</th>
            <th>Jumlah Terjual</th>
            <th>Tanggal Transaksi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={sale.id}>
              <td>{index + 1}</td>
              <td>{sale.item.name}</td>
              <td>{sale.quantity}</td>
              <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => deleteSale(sale.id)}>Delete</button>
                <button onClick={() => window.location.href = `/edit-sale/${sale.id}`}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>

      <button onClick={() => window.location.href = '/add-item'}>Add New Item</button>
      <button onClick={() => window.location.href = '/add-sale'}>Add New Sale</button>
    </div>
  );
}
