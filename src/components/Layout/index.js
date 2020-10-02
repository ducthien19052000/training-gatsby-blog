import React, { useMemo, useState } from 'react'
import {Container,Row,Col, Card, Button, Form, Modal, Image, Navbar, NavDropdown, Nav, FormControl} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'


const Layout = ({category,posts,onRemovePost,onRemoveCate,onAddCate,onEditCate,onAddPost}) => {

  const   today= new Date();
    const [titleCate,setTitleCate] = useState("Select Cate")
    const [postAll,setPosts]= useState(posts)
    const [postFilter,setPostFilter] = useState(postAll)
    const [postDetail,setPostDetail] = useState({})
    const [show,setShow]=useState(false);
    const [showAddCate,setShowCate]=useState(false);
    const [showAddPost,setShowAddPost] = useState(false)
    const [validated, setValidated] = useState(false);
    const [newCatePost,setNewCatePost]=useState({})
    const   [search,setSearch] = useState("");
    const [sortType,setSortType] = useState("");
    const [newPost,setNewPost] = useState({})
    const [currentPage,setCurrentPage] = useState(1);
    const [currentCate,setCurrentCate] = useState({})
    const [showEditPost,setShowEditPost]=useState(false)
    const [showEditCate,setShowEditCate]=useState(false)
    const prsPerPage = 6;
    const indexOfLastPost= currentPage*prsPerPage;
    const indexOfFirtPost =indexOfLastPost - prsPerPage;


  
    const handleClick = page => setCurrentPage(page);
    const onClickShowAll=()=>{
            setTitleCate("All post")
            setPostFilter(postAll)
            setCurrentCate({})
    }
    const onHandleChangeAddCate=(e)=>{
      const {name}=e.target;
    
      setNewCatePost({...newCatePost,[name]: e.target.value}) 
    }  
    const onHandleAddCate=(e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        alert("Điền đầy đủ thông tin")
      }
      else{
        e.preventDefault();
        setValidated(true);
        setShowCate(false);
        onAddCate({ id: Math.random().toString(36).substr(2, 9),...newCatePost})
        alert("Thêm danh mục mới thành công")
      }
   
    }
    const onHandleClick=(id)=>{
            const data = postAll.filter(post => post.cateId===id);
            const title = category.filter(cate => cate.id===id)
            setCurrentCate(title[0])
            setCurrentPage(1)
            setTitleCate(title[0].name)
            setPostFilter(data)
    }

    const onHandleShowEditCate=(id)=>{
      setShowEditCate(true)
          setNewCatePost(currentCate);
    }

    const onHandleEditCate=(e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        alert("Điền đầy đủ thông tin")
      }
      else{
        e.preventDefault();
        setValidated(true);
        setShowEditCate(false);
        onEditCate(newCatePost)
        setTitleCate(newCatePost.name)
        alert("Sửa  thành công")
      }

    }

    const onHandleDeleteCate=(id)=>{
          onRemoveCate(id)
          const data= postAll.filter(post=>post.cateId!==id);
          const newDb = postFilter.filter(post=>post.cateId!==id)
          setPosts(data)
          setPostFilter(newDb)
          setTitleCate("Select")
          setCurrentCate({})
    }

    const onHandleShowDetail=(id)=>{
        setShow(true);
            const data = postAll.filter(post => post.id ===id);
            setPostDetail(data[0])
    }

    const onHandleChangeAddPost=(e)=>{
      const {name}=e.target;
      setNewPost({...newPost,[name]: e.target.value}) 
    }

    const onHandleAddPost=(e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        alert("Điền đầy đủ thông tin")
      }
      else{
        e.preventDefault();
        setValidated(true);
        let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        setShowAddPost(false);
       
        onAddPost({ id: Math.random().toString(36).substr(2, 9),...newPost,date});
        setPosts([...postAll,{ id: Math.random().toString(36).substr(2, 9),...newPost,date}])
        setPostFilter([...postFilter,{ id: Math.random().toString(36).substr(2, 9),...newPost,date}])
        alert("Thêm mới thành công")
      }
    }

    const onHandleShowEdit=(id)=>{
      setShowEditPost(true);
      const data = postAll.filter(post => post.id ===id);
      setNewPost(data[0])
    }

    const onHandleEditPost=(e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        alert("Điền đầy đủ thông tin")
      }
      else{
        e.preventDefault();
        setValidated(true);
        setShowEditPost(false);
        const newPostAll = postAll.map(post=>post.id===newPost.id?newPost:post)
        const newFilterPost = postFilter.map(post => post.id ===newPost.id?newPost:post)
        const data = newFilterPost.filter(post=>post.cateId===currentCate.id)
        setPosts(newPostAll)
        setPostFilter(data)
        alert("Sửa  thành công")
      }
    }

    const onHandleDeletePost=(id)=>{
        onRemovePost(id)
        const data=  postAll.filter(post=>post.id !==id);
        const newData = postFilter.filter(post =>post.id!==id)
        setPosts(data)
        setPostFilter(newData)
        alert("Xóa thành công")
    }
    const  postSort = useMemo(()=>{
      let postSort= postFilter;
      if(search){
        postSort = postSort.filter(note=>note.title.toLowerCase().includes(search.toLowerCase()))
      }
      else if(sortType){
       const isRevered = (sortType==="asc")?1:-1;
       postSort = postSort.sort((a,b)=>isRevered*  a.title.localeCompare(b.title))
      }
     
      return postSort;
  },[search,postFilter,sortType])
   const onSort=(sortType)=>{
       setSortType(sortType)
      
   }
   const pageNumbers=[];
   for(let i =1;i<=Math.ceil(postFilter.length / prsPerPage);i++){
           pageNumbers.push(i);
   }
   const newProduct = postSort.slice(indexOfFirtPost,indexOfLastPost)
    return (
        <>
            <Container>
            <Row className="row-head">
                <Col className="Header-title">
                <Image className="logo" src="https://rawcdn.githack.com/ducthien19052000/images/442a26eecbf35ea79291431fb0dfc313931348f6/Untit-3.png"/>

                 </Col>
                 <Navbar bg="dark"  variant="dark" expand="lg" >
                    <Navbar.Brand >Fabbi Traing</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                        <NavDropdown title={titleCate} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={onClickShowAll}  className="cate-post">All Post</NavDropdown.Item>
                        {category.map((cate,index)=>(
                          
                          <NavDropdown.Item key ={index} onClick={()=>onHandleClick(cate.id)} className="cate-post">{cate.name}</NavDropdown.Item>
                      
                      
                        ))}
                         
                        </NavDropdown>
                        <Nav.Link onClick={()=>setShowCate(true)}>Thêm Danh mục </Nav.Link>
                        {Object.keys(currentCate).length===0?<></>:
                        <>
                        <Nav.Link onClick={()=>onHandleDeleteCate(currentCate.id)}>Xóa cate</Nav.Link>
                        <Nav.Link onClick={()=>onHandleShowEditCate(currentCate.id)}>sửa cate</Nav.Link>
                        </>
                        }
                      </Nav>
                      <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" name="search"  onChange={e=>setSearch(e.target.value)}/>
                        
                      </Form>
                    </Navbar.Collapse>
                  </Navbar>
                
               
            </Row>
            
            <Row className="post-blog">
              <>
                {Object.keys(category).length===0?
                <></>:
                <Row className="option">
                <Button onClick={()=>setShowAddPost(true)} style={{margin:'15px'}}>Thêm Post </Button>
                <Button variant="primary" onClick={()=>onSort("asc")}  style={{ margin: '10px'}} >A_Z </Button>
                  <Button variant="primary"onClick={()=>onSort("desc")} style={{ margin: '10px'}} >Z-A </Button>
             
                </Row>  
              }
              </>
                <Row>
                <Col>
             
                
             {newProduct.map((post,index)=>(
                  <Card  className="blog-item" key={index}>
                          
                  <Card.Body>
                   <Card.Title>{post.title}

                   </Card.Title>
                    <Card.Text className="item-content">
                    {post.description}
                    </Card.Text>
                  
                   
                    
                  </Card.Body>
                  <Card.Footer className="text-muted">
                  {post.date}
                  <Button variant="primary"  className="item-detail" onClick={()=>onHandleShowDetail(post.id)}>Chi tiết </Button>
                    <Button  onClick={()=>onHandleDeletePost(post.id)} ><FaRegTrashAlt/></Button>
                  <Button onClick={()=>onHandleShowEdit(post.id)} > <FaRegEdit/></Button></Card.Footer>
                  
                </Card>
                    

     
             ))}
       
      
         </Col>
         
                </Row>
        <Row  style={{width: '100%', float: 'left'}}>
        <div className="pagination">
      <ul className="pagination">
        <Button
          className={`${pageNumbers[0] === currentPage && "disabled"}`}
          onClick={()=>handleClick( currentPage - 1)}
        >
          Prev
        </Button>
        {pageNumbers.map(page => (
          <Button
            className={`${currentPage === page && "active"}`}
            onClick={()=>handleClick( page)}
          >
            {page}
          </Button>
        ))}
        <Button
          className={`${pageNumbers.reverse()[0] === currentPage && "disabled"}`}
         
          onClick={()=>handleClick( currentPage + 1)}
        >
          Next
        </Button>
      </ul>
    </div>
        </Row>

            </Row>
            <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" style={{width: '75%'}}>
            {postDetail.title}
          
          </Modal.Title>
          <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label> Ngày tạo : {postDetail.date}</Form.Label><br/>
       
            
            </Form.Group>
        </Modal.Header>
        <Modal.Body>
        <Form >
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" rows={3} className="content-item"  value={postDetail.content} />
            </Form.Group>
            
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShow(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        show={showAddCate}
        onHide={() => setShowCate(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add CatePost
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={onHandleAddCate}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title </Form.Label>
            
              
              <Form.Control type="title"name="name" placeholder="Title"  required  onChange={onHandleChangeAddCate}/> 
            </Form.Group>
            <Button type="submit">Save </Button>
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShowCate(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        show={showEditCate}
        onHide={() => setShowEditCate(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit CatePost
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={onHandleEditCate}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title </Form.Label>
            
              
              <Form.Control type="title" name="name" placeholder="Title" value={newCatePost.name} required  onChange={onHandleChangeAddCate}/> 
            </Form.Group>
            <Button type="submit">Save </Button>
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShowEditCate(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        show={showAddPost}
        onHide={() => setShowAddPost(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={onHandleAddPost}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title </Form.Label>
              <Form.Control type="title"name="title" placeholder="Title"  required  onChange={onHandleChangeAddPost}/> 
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Description </Form.Label>
              <Form.Control type="title"name="description" placeholder="Description"  required  onChange={onHandleChangeAddPost}/> 
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustomSizeLg">
              <Form.Label>Custom select Large</Form.Label>
              <Form.Control as="select" size="lg" custom name="cateId"  required onChange={onHandleChangeAddPost}>
                <option> </option>
                {category.map((cate,index)=>(
                  <option value={cate.id}>{cate.name}</option>
                ))}
                
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" rows={3} required  onChange={onHandleChangeAddPost}/>
            </Form.Group>
            <Button type="submit">Save </Button>
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShowAddPost(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        show={showEditPost}
        onHide={() => setShowEditPost(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={onHandleEditPost}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title </Form.Label>
              <Form.Control type="title"name="title" placeholder="Title" value={newPost.title}   required  onChange={onHandleChangeAddPost}/> 
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Description </Form.Label>
              <Form.Control type="title"name="description" placeholder="Description" value={newPost.description} required  onChange={onHandleChangeAddPost}/> 
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustomSizeLg">
              <Form.Label>Custom select Large</Form.Label>
              <Form.Control as="select" size="lg" custom name="cateId" value={newPost.cateId} required onChange={onHandleChangeAddPost}>
                <option> </option>
                {category.map((cate,index)=>(
                  <option value={cate.id}>{cate.name}</option>
                ))}
                
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" value={newPost.content} rows={3} required  onChange={onHandleChangeAddPost}/>
            </Form.Group>
            <Button type="submit">Save </Button>
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShowEditPost(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
            </Container>
        </>
        
    )
}

export default Layout
