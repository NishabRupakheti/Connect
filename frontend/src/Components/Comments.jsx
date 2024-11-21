import React from "react";


const Comments = ({ comments }) => {
  console.log("The comments recived by the component");
  console.log(comments);

  console.log("Aray comments")
  comments.forEach((com) =>{
    console.log(com.message)
  })
  

  return (
    <>
      <div className="card">
        {comments && comments.length > 0 ? (
          // comments.map((comment, index) => (
          //   <div key={index} className={`card mt-2`}>
          //     <div className="card-body">
          //       <h6 className="card-title">
          //         {comment.userId?.userName || "Anonymous"}
          //       </h6>
          //       <p className="card-text">{comment.message}</p>
          //       <small className="text-muted">
          //         {new Date(comment.createdAt).toLocaleString()}
          //       </small>
          //     </div>
          //   </div>
          // ))

          <h1>BOOM</h1>


        ) : (
          <p className="text-muted">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </>
  );
};

export default Comments;
