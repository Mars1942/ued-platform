<script>
  const SERVER_PRE = "/server";
  const PATH_USER = SERVER_PRE + "/user/";
  const PATH_ROLE = SERVER_PRE + "/role/";
  const PATH_COURSE = SERVER_PRE + "/course/";
  const PATH_APPLICATION = SERVER_PRE + "/application/";

  export default{
    PATH_USER:PATH_USER,
    PATH_LOGIN:PATH_USER + "/login",
    PATH_USER_PAGE_BY_PARAM:PATH_USER + "/pageByParam",
    PATH_USER_LIST_ALL:PATH_USER + "/list",
    PATH_USER_LIST_BY_PARAM:PATH_USER + "/listByParam",
    PATH_USER_BY_LOGIN:PATH_USER + "/getUserByLoginName",
    PATH_ROLE:PATH_ROLE,
    PATH_ROLE_LIST:PATH_ROLE + "/list",
    PATH_ROLE_LIST_ALL:PATH_ROLE + "/listAll",
    PATH_COURSE:PATH_COURSE,
    PATH_COURSE_LIST:PATH_COURSE + '/list',
    PATH_COURSE_LIST_ALL:PATH_COURSE + '/listAll',
    PATH_COURSE_PAGE_BY_PARAM:PATH_COURSE + 'pageByparam',
    PATH_COURSE_DEL_USER:PATH_COURSE + '/user/',
    PATH_COURSE_USER:PATH_COURSE + '/user',
    PATH_APPLICATION:PATH_APPLICATION,
    PATH_APPLICATION_LIST:PATH_APPLICATION + '/list',
    PATH_APPLICATION_LIST_ALL:PATH_APPLICATION + '/listAll',
    PATH_APPLICATION_LIST_BY_USER:PATH_APPLICATION +"listByUser/",
  }
</script>
