import React, { useState} from 'react'
import Layout from '../../component/layout/layout';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col,Modal,Button ,Form} from 'react-bootstrap';
import './product.css';
import { addProduct } from '../../action/product_Action';


function Product() {
    const [show, setShow] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const product = useSelector(state => state.product); 

    const [productname, setProductname] = useState('');
    const [productprice, setProductprice] = useState('');
    const [productquantity, setProductquantity] = useState('');
    const [description, setDescription] = useState('');
    const [categoryid, setCategoryid] = useState('');
    const [productPicture, setProductPicture] = useState([]);
    const [viewproductdetail, setViewproductdetail] = useState([null]);
    const [Name, setname] = useState('');
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    // const test = {
    //     user: [
    //         {naem:'mart',age:20}
    //     ]
    // }
    // console.log(test)
    
    // test.user.push({ name: 'mart1', age: 20 })
    
    // console.log(test)


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {

        let formcategoryid = categoryid.split(",")[0];
        let categoryname = categoryid.split(",")[1];
        

        const form = new FormData();
        form.append('name', productname);
        form.append('price', productprice);
        form.append('quantity', productquantity);
        form.append('description', description);
        form.append('category', formcategoryid);
        for (let pic of productPicture) { 
            form.append('productPictures', pic);
        }
       
        dispatch(addProduct(form,categoryname));

        
        setShow(false);
       
    };
    const handlecloseDetail = () => setShowDetail(false);
    const handleShowDetail = (product) => {
        setViewproductdetail(product);
        setShowDetail(true)
    };
    const handleproductPicture = (e) =>{ 
        setProductPicture([
            ...productPicture,
            e.target.files[0]
        ]);
    }

 const rndergetproduct = () => {
     return (
        <Table responsive="sm">
        <thead >
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Description</th>
          <th>Category</th>
             </tr>
         </thead>
          <tbody >
                 {product.product.length > 0 ?  product.product.map(product => <tr key={product._id} onClick={() => handleShowDetail(product)}>
                     <td >-</td>
                     <td >{product.name}</td>
                     <td >{product.price}</td>
                     <td >{product.quantity}</td>
                     <td style={{textAlign:"start"}}>{product.description}</td>
                     <td >{product.category.name}</td>
                 </tr>)
                 
               : null
               }
             </tbody>
             { !viewproductdetail ? null :
                 <Modal show={showDetail} onHide={handlecloseDetail}>
                     <Modal.Header closeButton>
                         <Modal.Title>Product Detail</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                     <Row>
                             <Col >
                             <Row><label className="header-detail">Name</label> </Row>
                             <Row>  {viewproductdetail.name}</Row>
                             </Col>
                             <Col >
                             <Row><label className="header-detail">Price</label> </Row>
                             <Row>  {viewproductdetail.price}</Row>
                             </Col>
                    </Row><br/>
                    <Row>
                             <Col >
                             <Row><label className="header-detail">Quantity</label> </Row>
                             <Row>  {viewproductdetail.quantity}</Row>
                             </Col>
                             <Col >
                             <Row><label className="header-detail">Category</label> </Row>
                             <Row> {!viewproductdetail.length ? viewproductdetail.category.name : null} </Row>
                             </Col>
                         </Row><br/>
                         <Row>
                             <Col >
                             <Row><label className="header-detail">Description</label> </Row>
                             <Row>  {viewproductdetail.description}</Row>
                             </Col>
                         </Row><br/>
                         <Row>
                             <Col >
                                 <Row><label className="header-detail">ProductPictre</label> </Row>
                                 {!viewproductdetail.length ? viewproductdetail.productPictures.map(pic => <div ><img src={`http://localhost:2000/public/${pic.img}`} width="100"/></div>):null}
                             </Col>
                         </Row>
                         
                         
                     </Modal.Body>
                     <Modal.Footer>
                         <Button variant="secondary" onClick={handlecloseDetail}>
                             Close
          </Button>
                     </Modal.Footer>
                 </Modal>
             }
             </Table>
   
         
     )
     

    }
    
    const createOption = (category, option = []) => { 
        for (let cat of category) { 
            option.push({
                _id: cat._id,
                name:cat.name
            })
            if (cat.children.length > 0) { 
                createOption(cat.children,option)
            }
        }
        return option;
    }
    return (
        <div>
            <Layout sidebar>
                <div className="header-product">
                <h1 >Product</h1>
                    <button onClick={ handleShow}>ADD</button>
                </div>

                <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                        <Form.Control type="text" placeholder="Product Name" value={productname} onChange={(e) => setProductname(e.target.value)} /><br />   
                        <Form.Control type="text" placeholder="Price" value={productprice} onChange={(e) => setProductprice(e.target.value)} /><br />     

                        <Form.Control type="text" placeholder="Quantity" value={productquantity} onChange={(e) => setProductquantity(e.target.value)} /><br />  

                        <Form.Control type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />     
                        <select value={categoryid} onChange={(e) => setCategoryid(e.target.value)}>
                            <option>Select Category</option>


                            {
                                createOption(category.category).map(option => <option key={option._id} value={`${option._id},${option.name}`}>{ option.name}</option>)
                            }
                        </select><br/><br/>
                        {
                            productPicture.length > 0 ?
                            productPicture.map((pic, index) => <div key={ index}>{ JSON.stringify(pic.name)}</div>) :null
                        }                        
                            
                        <input type="file" name="productPicture" onChange={handleproductPicture} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>




                <br />
                    {rndergetproduct()}


            </Layout>
        </div>
    )
}

export default Product
