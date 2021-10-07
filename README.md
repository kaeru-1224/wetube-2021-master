# Wetube Reloaded 

1) 주된 데이터는 무엇일까?
✔videos
✔user
👉 이를 바탕으로 url 을 디자인한다 

2)url을 디자인해보자 

✔/(home)을 기반으로 그룹화
💚global router: 홈에서 바로 갈 수있는 페이지를 담고있음
/ : home page
/join : join the web 
/login: login 
/search: search 

✔/users 를 기반으로 그룹화
/user/:id -> see user
/user/logout
/edit-user :edit my profile 
👉/users/edit
/delete-user :delete my profile
👉/users/delete






✔/videos 를 기반으로 그룹화

/watch-video:watch video
👉/videos/:id
- id로 동영상을 찾기 위함 
/videos/upload-> upload video

✨video를 업로드하고 지우는건 작성자만 필요하므로 id가 필요
/edit-video:edit video
👉/videos/edit/:id
/delete-video:delete video
👉/videos/delete/:id





✨이전의 조금 더 그룹화되어있지 않은 상태의  url을  라우터가 주제 기반의 url로 그룹화해준다. 즉  /users를 형성해주고 그와 관련된  url을 추가해서 나가도록한다 
