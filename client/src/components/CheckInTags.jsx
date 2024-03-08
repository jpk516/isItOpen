// examples are "lively", "quiet", "loud", "closing up ", "busy", "empty", "friendly", "unfriendly", "dangerous", "safe", "clean", "dirty", "expensive", "cheap", "upscale", "casual", "formal", "family-friendly", "adults-only", "touristy", "local", "hipster", "mainstream", "trendy", "divey", "sports-bar", "dance-club", "live-music", "karaoke", "trivia", "open-mic", "comedy", "lgbtq-friendly", "pet-friendly", "smoking-allowed", "smoking-prohibited", "vaping-allowed", "vaping-prohibited", "marijuana-friendly", "marijuana-prohibited

import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { useState } from 'react';

function CheckInTags({tags}) {
    const [clickedTags, setClickedTags] = useState([]);

    const handleTagClick = (tag) => {
        if (clickedTags.includes(tag)) { 
            setClickedTags(clickedTags.filter((clickedTag) => clickedTag !== tag));
        } else {
            setClickedTags([...clickedTags, tag]);
        }
    };

    return (
        <>
            <Stack direction="horizontal" gap={2} className='mt-2 mb-4'>
                {tags.map((tag) => (
                    <h5>
                        <Badge
                            key={tag}
                            bg={clickedTags.includes(tag) ? "success" : "secondary"}
                            onClick={() => handleTagClick(tag)}
                            style={{ cursor: "pointer" }}
                        >
                            {tag}
                        </Badge>
                    </h5>
                ))}
            </Stack>
        </>
    );
}
  
export default CheckInTags;