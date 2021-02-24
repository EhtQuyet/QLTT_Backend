const SaveHistoryRequest = (document, schemaHistory, action, staff_id, citizen_id) => {
  try{
    let data_history = {}

    data_history.document_id = document._id
    data_history.action = action
    data_history.data = document
    data_history.created_by = staff_id
    data_history.citizen_id = citizen_id
    schemaHistory.create(data_history)
  }catch (err){
    console.log(err)
  }
};

const SaveHistoryUser = (document, schemaHistory, action, user_id) => {
  try{
    let data_history = {}

    data_history.document_id = document._id
    data_history.action = action
    data_history.data = document
    data_history.created_by = user_id
    schemaHistory.create(data_history)
  }catch (err){
    console.log(err)
  }
};

const SaveHistory = (document, schemaHistory, action, user_id) => {
  try{
    let data_history = {}

    data_history.document_id = document._id
    data_history.action = action
    data_history.data = document
    data_history.created_by = user_id
    schemaHistory.create(data_history)
  }catch (err){
    console.log(err)
  }
};

export  {SaveHistoryRequest, SaveHistory, SaveHistoryUser};
