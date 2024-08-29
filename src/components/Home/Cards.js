import React from 'react'
function Cards({response}) {
  return (
    <div>
        {response?.data?.length>0?<>
        <div className='row gap-2 mx-auto container '>
        {response?.data?.map((item,index)=>{
            return(
                <div key={index} className='card col-lg-2 col-sm-5 col-xl-2 mt-2 mb-3 p-2 d-flex flex-column align-items-center justify-content-center'
                style={{
                    backgroundColor:`${item?.bg}`,
                    border:`1px solid ${item?.bg}`
                }}
                >
                    <div>
                        <img src={`http://localhost:8001/uploads/${item?.image}`} alt="no image"
                        className='image-card'
                        />
                    </div>
<div>
    <div className='cursor'>
    <i className="fa-solid fa-pen-to-square"></i>
    </div>
</div>
                </div>
            )
        })}
        </div>
        </>:<>No Data Found</>}
    </div>
  )
}

export default Cards