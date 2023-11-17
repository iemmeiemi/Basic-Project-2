API REQUEST FORM:
I/ Post: 1. Get all post: req.query
{
page:
size:
userId: //tại vì ai cũng có thể xem dc trang cá nhân của người khác
}

    2. Get one post: req.params.id

    3. Get deleted post: required login

    4. Create: req.body, require login
    {
        caption: ,
        hashTag: ,
        images: ,
        videos: ,
        
    }
    
    5. Restore post: req.params.id, required login

    6. Update post: req.body
    {
        caption: ,
        hashTag: ,
        postViewer: ,
    }.
    Chỉ đổi được 3 trường trên, không thể đổi những trường khác.
    Require login

    7. Soft Delete: req.params.id, require login
