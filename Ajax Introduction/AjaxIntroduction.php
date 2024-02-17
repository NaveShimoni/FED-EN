<?php

function check($username)
{
$users = array('david', 'michael', 'dan', 'tamar', 'jane');
if (in_array($username, $users))
{
return "<font color='red'>username exists</font>";
}
else { return "..."; }
}
if(isset($_GET['username']))
{
echo check(trim($_GET['username']));
}

?>