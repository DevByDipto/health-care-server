<h2>📬 API Endpoints</h2>
<table border="1" cellpadding="5" cellspacing="0">
  <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Auth</th> <th>Role</th> </tr>
  <tr> <td>POST</td> <td>/user/create-doctor</td> <td>Create a new doctor</td> <td>✅</td> <td>SUPER_ADMIN</td> </tr>
  <tr> <td>POST</td> <td>/user/create-admin</td> <td>Create a new admin</td> <td>✅</td> <td>SUPER_ADMIN</td> </tr>
  <tr> <td>POST</td> <td>/user/create-patient</td> <td>Create a new patient</td> <td>❌</td> <td>PUBLIC</td> </tr>
  <tr> <td>PATCH</td> <td>/user/:id/status</td> <td>Change user status</td> <td>❌ (Based on your file — no token provided)</td> <td>ADMIN / SUPER_ADMIN</td> </tr>
  <tr> <td>GET</td> <td>/user</td> <td>Get all users</td> <td>✅</td> <td>ADMIN</td> </tr> <tr> <td>GET</td> <td>/user/me</td> <td>Get my profile</td> <td>✅</td> <td>PATIENT / DOCTOR / ADMIN</td> </tr> 
  <tr> <td>PATCH</td> <td>/user/update-my-profile</td> <td>Update my profile</td> <td>✅</td> <td>PATIENT / DOCTOR / ADMIN</td> </tr>
</table>
