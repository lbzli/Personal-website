import http from "@/api";

export const getBusinessTypeList = params => {
	return http.get("/api/collection", params);
};

export const addBusinessTypeInfo = data => {
	return http.post("/api/collection", data);
};

export const updateBusinessTypeInfo = data => {
	return http.put("/api/BusinessType/2", data);
};

export const deleteBusinessTypeInfo = id => {
	return http.delete(`/api/collection/${id}`);
};
