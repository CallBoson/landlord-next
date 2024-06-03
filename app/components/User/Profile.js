"use client";

import useFetch from "@/app/hooks/useFetch";

export default function Profile() {
  const { data, error, isLoading } = useFetch({ url: "/api/user/info" });

  if (error) return <div>failed to load user</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      Hello {data.name}, welcome back! You have {data.coins} coins.
    </div>
  );
}
