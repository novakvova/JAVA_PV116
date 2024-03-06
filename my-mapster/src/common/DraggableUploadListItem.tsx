import React from 'react';
import type { UploadFile } from 'antd';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';


interface DraggableUploadListItemProps {
    // eslint-disable-next-line
    originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    // eslint-disable-next-line
    file: UploadFile<any>;
}

const DraggableUploadListItem = ({ originNode, file }: DraggableUploadListItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: file.uid,
    });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'move',
        height: '100px',
        width: '100px',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            // prevent preview event when drag end
            className={isDragging ? 'is-dragging' : ''}
            {...attributes}
            {...listeners}
        >
            {/* hide error tooltip when dragging */}
            {file.status === 'error' && isDragging ? originNode.props.children : originNode}
        </div>
    );
};

export default DraggableUploadListItem;