import ClipLoader from "react-spinners/ClipLoader";

export const Loading=()=>{
    return(
        <>
        <ClipLoader
        color={"red"}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </>
    )
}