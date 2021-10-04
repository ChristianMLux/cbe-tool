import firestore from "@/firestore";
import { getDocs, collection, getDoc, doc, addDoc } from "firebase/firestore";
let allQuestions = getDocs(collection(firestore, "ama-questions"));

class DBService {
  getAllQuestions() {
    return allQuestions;
  }
  getQuestion(questionKey) {
    const docRef = doc(firestore, "ama-questions", questionKey);
    const docSnap = getDoc(docRef);
    return docSnap;
  }
  addQuestion(questionToList) {
    return addDoc(collection(firestore, "ama-questions"), {
      ...questionToList,
    });
  }
}

export default new DBService();
