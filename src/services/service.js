import { jwtStorage } from "../utils/jwtStorage"

const baseUrl = import.meta.env.VITE_BASE_URL


export const getDataPrivate = async () =>{
    try{
        const token = await jwtStorage.retrieveToken()
        const response = await fetch(`${baseUrl}/api/v1/protected/data`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        if(!response.ok) throw new Error("failed to get data private")
        const result = await response.json()
        return result
    }catch(error){
        throw error
    }
}

export const register = async (formData) => {
  try {
    const response = await fetch(`${baseUrl}/api/v1/auth/register`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    return {
      status: response.status, // ambil status HTTP
      data: result,            // isi body JSON
    };
  } catch (error) {
    throw error;
  }
};


export const loginProses = async (values) =>{
    try{
        const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
            method:"POST",
            body: values
        })
        if(!response.ok) throw new Error("feiled to login")
        const result = await response.json()
        return result
    }catch(error){
        throw error
    }
}


// KASIR

export const getDataTransaksiKasir = async () =>{
  try{
    const token = await jwtStorage.retrieveToken()
    const response = await fetch(`${baseUrl}/api/v1/kasir/readTransaksiKasir`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    if(!response.ok) throw new Error("failed to get data transaksi kasir")
    const result = await response.json()
    return result
  }catch(error){
    throw error
  }
}

// Fungsi untuk mengambil semua data transaksi
export const getTransaksi = async () => {
  try {
    const token = await jwtStorage.retrieveToken(); // Ambil token untuk otorisasi
    const response = await fetch(`${baseUrl}/api/v1/kasir/transaksi`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data transaksi");
    }
    const result = await response.json();
    return result.datas; // Langsung kembalikan array 'datas'
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk membuat order baru
export const createOrder = async (orderData) => {
  try {
    const token = await jwtStorage.retrieveToken();
    const response = await fetch(`${baseUrl}/api/v1/kasir/transaksi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.error || "Gagal membuat order baru");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllRuangan = async () =>{
  try{
    const token = jwtStorage.retrieveToken()
    const response = await fetch(`${baseUrl}/api/v1/ruangan/readRuangan`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    const result = await response.json()
    return result
  }catch(error){
    throw error
  }
}

export const postTransaksiRuangan = async (
  id_user,
  id_ruangan,
  waktu_mulai,
  waktu_selesai,
  metode_pembayaran,
  total_harga_final,
  nama_guest
) => {
  try {
    const token = await jwtStorage.retrieveToken();

    const response = await fetch(`${baseUrl}/api/v1/ruangan/bookRuangan`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_user,
        id_ruangan,
        waktu_mulai,
        waktu_selesai,
        metode_pembayaran,
        total_harga_final,
        nama_guest
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error postTransaksiRuangan:", error);
    throw error;
  }
};

// Fungsi untuk mengambil data vo
export const getDataPaketVO = async () => {
  try {
    const token = await jwtStorage.retrieveToken();
    const response = await fetch(`${baseUrl}/api/v1/virtualOffice/readPaketVirtualOffice`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) throw new Error("Gagal mengambil paket VO");
    const result = await response.json();
    return result.datas; // ⬅️ langsung return array
  } catch (error) {
    throw error;
  }
};


// Fungsi untuk mengambil detail data vo
export const getDetailPaketVO = async (id) => {
  try {
    const token = await jwtStorage.retrieveToken()
    const response = await fetch(`${baseUrl}/api/v1/readDetailPaketVirtualOffice/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) throw new Error("Gagal mengambil detail paket VO")
    const result = await response.json()
    return result.data // ambil field data
  } catch (error) {
    throw error
  }
}
