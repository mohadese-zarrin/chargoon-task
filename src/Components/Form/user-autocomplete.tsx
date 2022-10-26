import { AutoComplete, Button } from 'antd';
import React, { useEffect, useRef, useState, useContext } from 'react';
import type { FormInstance } from 'antd/es/form';
import { getUsers } from '../../transportLayer';
import { UserType } from '../../types'
import UserListContaxt from '../Form/userContext'


interface Props {
  form: FormInstance
}
const UserAutoComplete: React.FC<Props> = ({ form }) => {
  const orginalOptions = useRef([]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const selectedUser = useRef<string>()
  const { userListData, updateUserList } = useContext(UserListContaxt)

  useEffect(() => {
    getUsers().then((users) => {
      orginalOptions.current = users;
      setOptions(users);
    })
  }, []);


  const onSearch = (searchText: string) => {
    setOptions(
      orginalOptions.current.filter(o => o.label.indexOf(searchText) > -1)
    );
  };

  const onSelect = (data: string) => {
    selectedUser.current = data
  };

  const addUser = () => {
    if (selectedUser.current && !userListData.find((e: UserType) => e.title === selectedUser.current)) {
      updateUserList([...userListData, { title: selectedUser.current, isDefault: false }])
      selectedUser.current = null
    }
  }

  return (
    <>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="جستجوی کاربر"
      />
      <Button onClick={addUser}>افزودن</Button>
    </>
  );
};

export default UserAutoComplete;