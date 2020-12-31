import React, { useState} from 'react'
import Layout from '../../component/layout/layout';
import { useSelector, useDispatch } from 'react-redux'; 
import { Container } from 'react-bootstrap';
import { Row, Col,Modal,Button ,Form} from 'react-bootstrap';
import { addCategory } from '../../action/catrgory';
import './category.css';
function Category() {
    const category = useSelector(state => state.category);
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryParentId, setCategoryParentId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');

    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {

        const form =new FormData();

        form.append('name', categoryName);
        form.append('parentId', categoryParentId);
        form.append('categoryImage', categoryImage);

        dispatch(addCategory(form));
        setShow(false);
       
    };

    const renderCategory = (categories) => {
        let mycategory = [];
        for (let cat of categories) { 
            mycategory.push(
                <li key={cat._id} style={{ listStyleType: "square" }}>
                    {cat.name}
                    {cat.children.length > 0 ? (<ul>{renderCategory(cat.children)}</ul>) : null}
                    
                </li>
            )
        }
            return mycategory
     }

    const createOption = (category,option=[]) => { 
        for (let cat of category) { 
            option.push({
                _id: cat._id,
                name: cat.name,
            })
            if (cat.children.length > 0) { 
                createOption(cat.children, option);
            }
        }
        return option;
    }
    return (
        <div>
            <Layout sidebar >
                <div className="test">
                    <button onClick={handleShow}>Add</button>
                    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                            
                            <Form.Control type="text" placeholder="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/><br />
                            
                            <select value={categoryParentId} onChange={(e) => setCategoryParentId(e.target.value)}>
                                <option>Select Category</option>{
                                    createOption(category.category).map(option => (<option key={option._id} value={option._id}>{ option.name}</option>))
                                }
                             
                            
                            </select>
                            
                            
                            
                            <input type="file" style={{ marginLeft: "30px" }} value={categoryImage} onChange={(e) => setCategoryImage(e.target.value)}></input>
                            
           
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
                    {renderCategory(category.category) }
                 
                       
                    </div>
              
            </Layout>
        </div>
    )
}

export default Category
