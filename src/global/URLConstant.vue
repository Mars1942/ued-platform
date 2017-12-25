<script>
  const SERVER_PRE = "/server";
  const PATH_USER = SERVER_PRE + "/user/";
  const PATH_ROLE = SERVER_PRE + "/role/";
  const PATH_COURSE = SERVER_PRE + "/course/";
  const PATH_APPLICATION = SERVER_PRE + "/application/";

  export default{
    PATH_USER:PATH_USER,
    PATH_LOGIN:PATH_USER + "/login",
    PATH_USER_LIST:PATH_USER + "/listByParam",
    PATH_USER_LIST_ALL:PATH_USER + "/listAll",
    PATH_USER_LIST_BY_COURSE:PATH_USER + "/listByCourse",
    PATH_ROLE:PATH_ROLE,
    PATH_ROLE_LIST:PATH_ROLE + "/list",
    PATH_ROLE_LIST_ALL:PATH_ROLE + "/listAll",
    PATH_COURSE:PATH_COURSE,
    PATH_COURSE_LIST:PATH_COURSE + '/list',
    PATH_COURSE_LIST_ALL:PATH_COURSE + '/listAll',
    PATH_APPLICATION:PATH_APPLICATION,
    PATH_APPLICATION_LIST:PATH_APPLICATION + '/list',
    PATH_APPLICATION_LIST_ALL:PATH_APPLICATION + '/listAll',
  }
</script>
