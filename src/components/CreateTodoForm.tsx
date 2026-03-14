"use client";

import axios from "axios";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type CreateTodoPayload = {
  
  title: string | null;
  description: string | null;
};
type Props = {
  editTodo: any;
  setEditTodo: React.Dispatch<React.SetStateAction<any>>;
  handleFetchData: () => void;
};
const schema = yup.object({
    title: yup.string().required("title is required."),
    description: yup.string().required("description is required."),
  })
  

export function CreateTodoForm({
  editTodo,
  setEditTodo,
  handleFetchData,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateTodoPayload>({
    resolver: yupResolver(schema),
    mode:"all"
  });
  const apiUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
  const onSubmit = async (data: CreateTodoPayload) => {
    try {
      if (editTodo) {
        // UPDATE
        await axios.patch(`${apiUrl}/v1/todos/${editTodo._id}`, data);
        setEditTodo(null);
      } else {
        // CREATE
        await axios.post(`${apiUrl}/v1/todos`, data);
      }

      handleFetchData();
      reset({title: "", description: "",});
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (editTodo) {
      reset({
        title: editTodo.title,
        description: editTodo.description,
      });
    }
  }, [editTodo, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("grid gap-4 max-w-md w-full")}
    >
      {/* Title Field */}
      <div className="grid gap-2">
        <Label htmlFor="todo-title">Title</Label>
        <Input
          id="todo-title"
          placeholder="Enter your todo title"
          autoComplete="off"
          {...register("title")}
        />

        {errors.title && (
          <p className="text-sm text-red-500">
            {errors.title.message as string}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div className="grid gap-2">
        <Label htmlFor="todo-description">Description</Label>

        <Textarea
          id="todo-description"
          placeholder="Enter todo description..."
          rows={4}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          {...register("description")}
        />

        {errors.description && (
          <p className="text-sm text-red-500">
            {errors.description.message as string}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-2 pt-2">
        <Button type="submit" className="w-full">
          {editTodo ? "Update Todo" : "Create Todo"}
        </Button>
      </div>
    </form>
  );
}
