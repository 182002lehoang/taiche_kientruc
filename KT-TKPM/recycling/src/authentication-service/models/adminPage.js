import React, { useState, useEffect } from "react";

function AdminPage() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("productList");
    if (storedData) {
      setProductList(JSON.parse(storedData));
    }
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedList = [...productList];
    updatedList[index].status = newStatus;
    setProductList(updatedList);
    localStorage.setItem("productList", JSON.stringify(updatedList));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Danh sách sản phẩm</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
        <thead>
          <tr>
            <th style={tableHeader}>STT</th>
            <th style={tableHeader}>Họ Tên</th>
            <th style={tableHeader}>Số điện thoại</th>
            <th style={tableHeader}>Tên sản phẩm</th>
            <th style={tableHeader}>Loại sản phẩm</th>
            <th style={tableHeader}>Địa chỉ</th>
            <th style={tableHeader}>Ghi chú</th>
            <th style={tableHeader}>Xét duyệt</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={index} style={tableRow}>
              <td style={tableData}>{index + 1}</td>
              <td style={tableData}>{product.name}</td>
              <td style={tableData}>{product.phone}</td>
              <td style={tableData}>{product.productName}</td>
              <td style={tableData}>{product.productType}</td>
              <td style={tableData}>{product.address}</td>
              <td style={tableData}>{product.note}</td>
              <td style={tableData}>
                <select
                  value={product.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Chờ duyệt">Chờ duyệt</option>
                  <option value="Đã xét duyệt">Đã xét duyệt</option>
                  <option value="Từ chối xét duyệt">Từ chối xét duyệt</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableData = {
    border: "1px solid #ddd",
    padding: "8px",
  };
  const tableRow = {
    backgroundColor: "#fff",
  };
  const tableHeader = {
    backgroundColor: "#f2f2f2",
    border: "1px solid #ddd",
    padding: "8px",
  };  

export default AdminPage;
