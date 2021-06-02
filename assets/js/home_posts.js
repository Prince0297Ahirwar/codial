{
    //method to submit the form using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(
            function(e){
                e.preventDefault(); //this will prevent default behaviour of form on submit
                $.ajax({
                    type:'post',
                    url:'/posts/create',
                    data: newPostForm.serialize(), //convert form data to key value pair
                    success :function(data){
                        let newPost = newPostDom(data.data.post);
                        $('#post-list-container>ul').prepend(newPost);
                    },
                    error:function(error){
                        console.log(error.responseText());
                    }
                });
            }
        );

    }

    let newPostDom = function(post){
        return $(`
        
            <p>
                <li id = "post-${post._id}">
                   
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
                        </small>
                    
                        ${post.content}
                    <br>
                    <small>
                    ${post.user.name}
                    </small>
                </li>
    
            </p> 
            <div class ="post-comments">
                
                    <form action="/comments/create" method="POST">
                        <input type="text" name ="content" placeholder="Type here to add comment" required>
                        <input type="hidden" name = "post" value="${post._id}">
                        <input type="submit" value="post">
                    </form>    
                
                <div class ="post-comments-list">
                    <ul id="post-comments-${post._id}">
    
                    </ul>
                </div>
            </div>   
    
        
        `);
    }


    createPost();

}