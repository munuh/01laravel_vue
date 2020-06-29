<template>
    <div class="container"> 
        <div class="row">
            <div class="col-12"> 
                <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Users Table</h3> 
                    <div class="card-tools">
                         <button class="btn btn-success green" @click="newmodal()">Add New
                             <i class="fa fa-user-plus"></i>
                         </button> 
                </div> 
                </div>
                
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                    <table class="table table-hover">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Registered</th>
                        <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-for="(user,index) in users" :key="user.id" > 
                          
                        <td>{{++index}}</td> 
                        <td>{{user.name}}</td> 
                        <td>{{user.email}}</td> 
                        <td>{{user.type | UpperText}}</td>  
                        <td>{{user.created_at | MyDate}}</td>  
                        <td>
                            <a href="#" @click="editmodal(user)">
                                <i class="fa fa-edit blue"></i>
                            </a>
                            <a href="#" @click="deleteuser(user.id)">
                                <i class="fa fa-trash red"></i>
                            </a>
                        </td>
                        </tr> 
                    </tbody>
                    </table>
                </div>
                <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>    
            <div class="modal fade" id="addnew" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-show="!editmode" id="exampleModalLongTitle">Add New User</h5>
                        <h5 class="modal-title" v-show="editmode" id="exampleModalLongTitle">Update User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>  
                    <form @submit.prevent="editmode?updateuser():createuser()" > 
                    <div class="modal-body">   
                        <div class="form-group">
                        <input v-model="form.name" type="text" name="name"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" placeholder="Username" >
                        <has-error :form="form" field="name"></has-error> 
                        </div>
                        <div class="form-group">
                        <input v-model="form.email" type="text" name="email"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('email') }" placeholder="Email" >
                        <has-error :form="form" field="email"></has-error>
                        </div>  
                        <div class="form-group">
                        <textarea v-model="form.bio"  name="bio" id="bio" placeholder="Short bio for user (optional)" class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }">
                       </textarea>      
                        <has-error :form="form" field="bio"></has-error>
                        </div> 
                         <div class="form-group">
                           <select name="type" v-model="form.type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                               <option value="" >Select User Role</option>
                               <option value="admin" >Admin</option>
                               <option value="user" >Standar User</option>
                               <option value="author" >Author</option>
                           </select>
                           <has-error :form="form" field="type"></has-error>     
                        </div>
                        <div class="form-group">
                          <input v-model="form.password" type="password" name="password" id="password"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('password') }" placeholder="Password" >  
                        <has-error :form="form" field="password"></has-error>          
                       </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="submit" v-show="!editmode" class="btn btn-success green">Create</button> 
                        <button type="submit" v-show="editmode" class="btn btn-primary blue">Update</button> 
                    </div>
                   </form>
                </div>
            </div>
        </div> 
    </div>

    
</template>
<script>
   // import toast from 'sweetalert2'; 
    export default {

        data(){
            return{
                editmode:false,
                users:{},  
                form : new Form({
                    id : '', 
                    name :'',
                    email :'',
                    password :'',
                    type :'',
                    bio :'',
                    photo:''
                })
            }
        },  
        methods: {
            loadusers(){ 
             
                axios.get('api/user').then(({data})=>(this.users=data.data)); 
            },
            newmodal(){
                this.editmode=false; 
                this.form.reset();  
                $('#addnew').modal('show');  
            },
            editmodal(user){ 
               this.editmode=true;
               this.form.reset();  
               $('#addnew').modal('show');  
               this.form.fill(user);
            },
             createuser(){
                this.$Progress.start();
                this.form.post('api/user')
                .then(()=>{
                    $('#addnew').modal('hide');
                    Fire.$emit('aftercreate');
                    toast.fire({ 
                        type: 'success',
                        title: 'User Created in successfully'})
                    this.$Progress.finish();
                })
                .catch(()=>{ 
                });  
           },
            updateuser(){
                this.$Progress.start();
                
                this.form.put('api/user/'+this.form.id)
                .then(()=>{
                    $('#addnew').modal('hide');
                    swal.fire("User Updated", "You clicked the button!", "success");
                    Fire.$emit('aftercreate');
                })
                .catch((message)=>{
                    console.log(message);
                     swal.fire('Failed!','There was something wrong','warning' )
                })
                this.$Progress.finish();        
            },
            deleteuser(id){
                 swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        //send request delete to server 
                        if (result.value) {
                            this.form.delete('api/user/'+id)
                            .then(()=>{
                                swal.fire(
                                          'Deleted!',
                                          'Your file has been deleted.',
                                          'success' )
                                Fire.$emit('aftercreate');          
                            })
                            .catch(
                                swal.fire('Failed!','There was something wrong','warning' )
                            ); 
                            
                        }
                    })
            }  
        },
        created(){ 
              Fire.$on('aftercreate',()=>{
                this.loadusers();    
            });
            this.loadusers(); 
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
 