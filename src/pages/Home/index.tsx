"use client";
import { CreateTodoForm } from "@/components/CreateTodoForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [data, setData] = useState<any[]>([]);
  const [editTodo, setEditTodo] = useState<any>(null);
  console.log("data", data);
  const apiUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
  console.log("apiUrl", apiUrl, data);

  const handleFetchData = async () => {
    const response = await axios.get(`${apiUrl}/v1/todos`);
    setData(response.data.data);
    console.log("response", response.data.data);
  };

  const handleDelete = async (id: any) => {
    await axios.delete(`${apiUrl}/v1/todos/${id}`);
    setData((prev) => prev.filter((item) => item._id !== id));
  };

  const handleEdit = (item:any) => {
    setEditTodo(item);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
    <CreateTodoForm editTodo={editTodo} setEditTodo={setEditTodo} handleFetchData={handleFetchData} />
      <div className="mx-auto grid max-w-2xl gap-6 p-6">
        {data.map((item, idx) => {
          return (
            <Card key={item?._id ?? idx}>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <ul className="grid gap-1 text-sm">
                    <li className="rounded-md  px-3 py-2">
                      {String(item?.title)}
                    </li>
                    <li className="rounded-md  px-3 py-2">
                      {String(item?.description)}
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button className="bg-black text-white px-4 py-2 rounded" onClick={() =>  handleEdit(item)}>
                  Edit
                </Button>
                <Button className="bg-black text-white px-4 py-2 rounded" onClick={() => handleDelete(item?._id)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
