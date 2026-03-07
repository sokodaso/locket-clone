function UserItem({name, email }: any) {
    return (
        <li className="user-item">
            <div className="user-item__content">
                <div className="user-item__info">
                    <h2>{name}</h2>
                    <p>{email}</p>
                </div>
            </div>
        </li>
    );
}

export default UserItem;