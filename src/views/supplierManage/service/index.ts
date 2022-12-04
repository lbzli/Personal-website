import http from "@/api";

export const getSupplierList = (params: any) => {
	return http.get("/api/supplier", params);
};

export const addSupplierInfo = (data: any) => {
	return http.post("/api/supplier", data);
};

export const updateSupplierInfo = (data: any) => {
	return http.put("/api/supplier", data);
};

export const deleteSupplierInfo = (id: string) => {
	return http.delete(`/api/supplier/${id}`);
};
