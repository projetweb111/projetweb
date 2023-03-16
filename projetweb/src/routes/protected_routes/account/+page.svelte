<script>
    import { page } from '$app/stores'
  </script>
  
<div class="container" style="padding: 50px 0 100px 0">
    <form class="row flex-center flex">
        <h1 class="header">My account</h1>
    </form>
    <form class="row flex-center flex">
        <h2 class="header">{$page.data.session.user.email}</h2>
    </form>
</div>