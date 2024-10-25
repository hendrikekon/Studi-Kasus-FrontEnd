import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../app/api/product";
import { fetchProduct, toggleTags } from "../../app/features/Product/actions";

const Tag = () =>{
    const dispatch = useDispatch();
    const [tags, setTags] = useState([]);
    const selectedTags = useSelector((state) => state.product.tags);

    useEffect(() => {
        const fetchTag = async() => {
            try {
                const response = await getTags()
                console.log('tags: ',response)
                setTags(response)
            } catch (error) {
                console.error(error);
            }
        }
        fetchTag()
    }, [])

    const handleTagsChange = (tag) => {
        const selectedTags = tag
        console.log(selectedTags);
        dispatch(toggleTags(tag));
        dispatch(fetchProduct());
    };

    return(
        <div className="tag-list">
            <p><strong>Tags: </strong></p>
            {tags.map((tag) => (
                <button key={tag._id} onClick={() => handleTagsChange(tag.name)} className={`tag-label ${selectedTags.includes(tag.name) ? 'selected' : ''}`}>{tag.name}</button>
            ))}
        </div>
    )
}

export default Tag;