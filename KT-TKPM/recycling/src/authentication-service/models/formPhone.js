import React, { useState, useEffect } from "react";

function FormPhone() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    productName: "",
    productType: "",
    address: "",
    note: "",
    status: "chờ duyệt",
  });

  const [productList, setProductList] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null); // State để lưu index của hàng được chọn

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được tải
    const storedData = localStorage.getItem("productList");
    if (storedData) {
      setProductList(JSON.parse(storedData));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name.trim() === "" ||
      formData.phone.trim() === "" ||
      formData.productName.trim() === "" ||
      formData.productType.trim() === "" ||
      !formData.image || 
      formData.address.trim() === ""
    ) {
      alert("Vui lòng điền đầy đủ thông tin vào các trường!");
      return;
    }
    if (selectedProductIndex !== null) {
      // Nếu có hàng được chọn, thì thực hiện cập nhật dữ liệu cho hàng đó
      const updatedList = [...productList];
      updatedList[selectedProductIndex] = formData;
      setProductList(updatedList);
      // Lưu danh sách sản phẩm mới vào localStorage
      localStorage.setItem("productList", JSON.stringify(updatedList));
      // Reset selectedProductIndex và form data
      setSelectedProductIndex(null);
      setFormData({
        name: "",
        phone: "",
        productName: "",
        productType: "",
        address: "",
        note: "",
        status: "chờ duyệt",
        image: null,
      });
    } else {
      // Nếu không có hàng được chọn, thì thực hiện thêm mới dữ liệu
      const updatedList = [...productList, formData];
      setProductList(updatedList);
      // Lưu danh sách sản phẩm mới vào localStorage
      localStorage.setItem("productList", JSON.stringify(updatedList));
      // Reset form data
      setFormData({
        name: "",
        phone: "",
        productName: "",
        productType: "",
        address: "",
        note: "",
        status: "chờ duyệt",
        image: null,
      });
    }
  };

  const handleRowClick = (index) => {
    // Xử lý sự kiện click vào hàng trong bảng
    setSelectedProductIndex(index); // Lưu index của hàng được chọn
    setFormData(productList[index]); // Đặt dữ liệu của hàng được chọn vào form data
  };

  // const handleDelete = (index) => {
  //   const updatedList = [...productList];
  //   updatedList.splice(index, 1); // Loại bỏ sản phẩm tại index
  //   setProductList(updatedList);
  //   localStorage.setItem("productList", JSON.stringify(updatedList));
  // };
  const handleDelete = (index) => {
    const productToDelete = productList[index];
    if (productToDelete.status === "Đã xét duyệt") {
      alert("Không thể xóa sản phẩm đã xét duyệt!");
      return; // Không thực hiện xóa nếu sản phẩm đã xét duyệt
    }

    const updatedList = [...productList];
    updatedList.splice(index, 1); // Loại bỏ sản phẩm tại index
    setProductList(updatedList);
    localStorage.setItem("productList", JSON.stringify(updatedList));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          image: event.target.result, // Đây là định dạng base64 của hình ảnh
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Tái Chế thiết bị điện tử
      </h2>
      {/* Form section */}
      <form style={{ width: "100%", maxWidth: 600 }} onSubmit={handleSubmit}>
        <div style={inputRow}>
          <div style={inputContainer}>
            <label>Họ Tên:</label>
            <input
              style={inputStyle}
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nhập tên"
            />
          </div>
          <div style={inputContainer}>
            <label>Số điện thoại:</label>
            <input
              style={inputStyle}
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Nhập số điện thoại"
            />
          </div>
        </div>
        <div style={inputRow}>
          <div style={inputContainer}>
            <label>Tên sản phẩm:</label>
            <input
              style={inputStyle}
              type="text"
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <div style={inputContainer}>
            <label>Loại sản phẩm:</label>
            <select
              style={inputStyle}
              value={formData.productType}
              onChange={(e) =>
                setFormData({ ...formData, productType: e.target.value })
              }
            >
              <option value="">Chọn loại sản phẩm</option>
              <option value="Samsung">Samsung</option>
              <option value="Iphone">Iphone</option>
              <option value="Redmi">Redmi</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
        </div>
        <div style={inputRow}>
          <div style={inputContainer}>
            <label>Hình ảnh:</label>
            <input
              style={inputStyle}
              type="file"
              onChange={handleImageUpload}
            />
          </div>
          {/* Hiển thị hình ảnh dưới dạng base64 */}
          {formData.image && (
            <img
              src={formData.image}
              alt="Product"
              style={{ maxWidth: 100, marginLeft: 20 }}
            />
          )}
        </div>
        <div style={inputRow}>
          <div style={inputContainer}>
            <label>Địa chỉ:</label>
            <input
              style={inputStyle}
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Nhập địa chỉ"
            />
          </div>
          <div style={inputContainer}>
            <label>Ghi chú:</label>
            <input
              style={inputStyle}
              type="text"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              placeholder="Nhập ghi chú"
            />
          </div>
        </div>
        <button style={buttonStyle} type="submit">
          {selectedProductIndex !== null ? "Cập nhật" : "Xác nhận"}
        </button>
      </form>

      {/* Table section */}
      <div style={{ marginTop: 50, width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Danh sách sản phẩm
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr>
              <th style={tableHeader}>STT</th>
              <th style={tableHeader}>Họ Tên</th>
              <th style={tableHeader}>Số điện thoại</th>
              <th style={tableHeader}>Tên sản phẩm</th>
              <th style={tableHeader}>Loại sản phẩm</th>
              <th style={tableHeader}>Hình ảnh</th>
              <th style={tableHeader}>Địa chỉ</th>
              <th style={tableHeader}>Ghi chú</th>
              <th style={tableHeader}>Thành tiền</th>
              <th style={tableHeader}>Xét duyệt</th>
              <th style={tableHeader}>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, index) => (
              <tr
                key={index}
                style={tableRow}
                onClick={() => handleRowClick(index)} // Xử lý sự kiện click vào hàng
              >
                <td style={tableData}>{index + 1}</td>
                <td style={tableData}>{product.name}</td>
                <td style={tableData}>{product.phone}</td>
                <td style={tableData}>{product.productName}</td>
                <td style={tableData}>{product.productType}</td>
                <td style={tableData}>
                  {product.image && (
                    <img
                      src={product.image}
                      alt="Product"
                      style={{ maxWidth: 100 }}
                    />
                  )}
                </td>
                <td style={tableData}>{product.address}</td>
                <td style={tableData}>{product.note}</td>
                <td style={tableData}>{product.price}</td>
                <td style={tableData}>{product.status}</td>
                <td style={tableData}>
                  <button onClick={() => handleDelete(index)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputRow = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 20,
};

const inputContainer = {
  flex: 1,
  marginRight: 50,
};

const inputStyle = {
  width: "100%",
  height: 35,
  borderRadius: 5,
  padding: "8px 10px",
  marginTop: 5,
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "20%",
  height: 45,
  fontSize: 20,
  borderRadius: 5,
  marginTop: 20,
  marginLeft: 220,
};

const tableHeader = {
  backgroundColor: "#f2f2f2",
  border: "1px solid #ddd",
  padding: "8px",
};

const tableData = {
  border: "1px solid #ddd",
  padding: "8px",
};

const tableRow = {
  backgroundColor: "#fff",
};

export default FormPhone;
