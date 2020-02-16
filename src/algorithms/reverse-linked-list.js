export const reverseLinkedList = (startNode)=>
{
    let prev = startNode;
    let current = prev.next;
    let post = current.next;
    prev.next = null;
    while(post!==null)
    {
        current.next = prev;
        prev = current;
        current = post;
        post = post.next;
    }
    current.next = prev;
    startNode = current
    return startNode;
}