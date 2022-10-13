import Tree from "@core/components/a-tree/tree.js";
import {
  getTree,
  getById,
  getTreePaths,
  getTreePathsV2,
  add,
  modify,
  remove,
  getCategorySelect,
} from "@actions/category.action";
import { resetState } from "@core/util/global";

const initState = () => ({
  tree: new Tree(),
  categoryList: [],
  categories: [],
  categoryPathsList: [],
  categoryPathsListV2: [],
  rootTree: {
    id: 0,
    documents: [],
    hasChildren: null,
    name: "",
    parentId: null,
    categoryChildrens: [],
  },
});

export default {
  state: initState(),
  mutations: {
    Reset_Categories(state) {
      resetState(state, initState);
    },
    Insert_Category(state, payload) {
      payload.forEach((item) => {
        state.tree.insertInTree(item, state.rootTree);
      });
    },
    Update_Category(state, payload) {
      state.tree.updateTree(payload, state.rootTree);
    },
    Delete_Category(state, id) {
      state.tree.deleteNode(id, state.rootTree);
    },
    Get_Category_Select(state, payload) {
      state.categoryList = payload;
    },
    Get_Tree_Paths(state, payload) {
      state.categoryPathsList = payload;
    },
    Get_Tree_Paths_V2(state, payload) {
      state.categoryPathsListV2 = payload;
    },
    Add_Category_Select_Item(state, payload) {
      state.categoryList.unshift(payload);
    },
    Remove_Category_Select_Item(state, ids) {
      ids.forEach((id) => {
        const index = state.categoryList.findIndex((c) => c.id == id);
        state.categoryList.splice(index, 1);
      });
    },
    Reset_Tree(state) {
      Object.assign(state.rootTree, {
        id: 0,
        documents: [],
        hasChildren: null,
        name: "",
        parentId: null,
        categoryChildrens: [],
      });
    },
  },
  actions: {
    GetCategoryTree({ commit }) {
      commit("Set_Main_Loading", true);
      getTree(({ data }) => {
        commit("Insert_Category", data);
        commit("Set_Main_Loading", false);
      });
    },
    getCategoriesLevel({ commit }, parentId) {
      getById(parentId ? parentId : '', ({ data }) => {
        commit("Insert_Category", data);
      });
    },
    getTreePaths({ commit }) {
      commit("Set_Main_Loading", true);
      getTreePaths(({ data }) => {
        commit("Get_Tree_Paths", data);
        commit("Set_Main_Loading", false);
      });
    },
    getTreePathsV2({ commit }) {
      commit("Set_Main_Loading", true);
      getTreePathsV2(({ data }) => {
        commit("Get_Tree_Paths_V2", data);
        commit("Set_Main_Loading", false);
      });
    },
    getCategorySelect({ commit }) {
      commit("Set_Main_Loading", true);
      getCategorySelect(({ data }) => {
        commit("Get_Category_Select", data);
        commit("Set_Main_Loading", false);
      });
    },
    setCategory({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = new FormData();
      formData.append("id", payload.dto.id);
      payload.dto.files.forEach((file) => {
        formData.append(`Files`, file);
      });
      formData.append("Name", payload.dto.name);
      payload.dto.parentCategoryId &&
        formData.append("parentCategoryId", payload.dto.parentCategoryId);
      add(formData, (data) => {
        payload.callback(data);
        commit("Set_Main_Loading", false);
      });
    },
    modifyCategory({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = new FormData();
      formData.append("id", payload.dto.id);
      payload.dto.files.forEach((file) => {
        formData.append(`Files`, file);
      });
      payload.dto.documents.forEach((doc, i) => {
        formData.append(`DocumentIds[${i}]`, doc.id);
      });
      formData.append("Name", payload.dto.name);
      payload.dto.parentCategoryId &&
        formData.append("parentCategoryId", payload.dto.parentCategoryId);
      modify(formData, (data) => {
        payload.callback(data);
        commit("Set_Main_Loading", false);
      });
    },
    deleteCategory({ commit }, payload) {
      commit("Set_Main_Loading", true);
      remove(payload.id, (data) => {
        payload.callback(data);
        commit("Set_Main_Loading", false);
      });
    },
  },
};
