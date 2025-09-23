import { useUser } from "../context/UserContext";

function Protected() {
  const user = useUser();

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className="text-xl">
          Protected route ( / ) Welcome, {user?.name}
          <br />
        </h1>
      </div>
    </>
  );
}

export default Protected;
