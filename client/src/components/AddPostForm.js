import React ,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useDispatch} from "react-redux";    
import FileBase64 from "react-file-base64";
import {
  Button,
  TextField,
  Select,
  Input,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {createPost} from "../actions/post"
import {fetchPosts} from "../actions/post";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const tags = ["fun", "programming", "science", "health"];
const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
});

const AddPostForm = ({ open, handleClose }) => {
  
  const dispatch = useDispatch();
 

  
  const [file , setFile] = React.useState(null);  

  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    // console.log({...data, file });
    dispatch(createPost({...data, image: file }));
    clearForm()
  }

  const clearForm = () => {
    reset();
    setFile(null);
    handleClose();
 };


  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Yeni Yazı Oluştur</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Yeni yazı eklemek için aşağıdaki formu doldurun.
        </DialogContentText>
        <div className={classes.root}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
            <TextField
              id="title"
              label="başlık"
              name="title"
              variant="outlined"
              size="small"
              fullWidth
              className={classes.textField}
              {...register("title")}
              error={errors?.title ? true : false}
            />
            <TextField
              id="subtitle"
              label="Alt başlık"
              name="subtitle"
              variant="outlined"
              size="small"
              fullWidth
              className={classes.textField}
              {...register("subtitle")}
              error={errors?.subtitle ? true : false}
            />
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  Input={<Input />}
                  className={classes.textField}
                  fullWidth
                >
                  {tags.map((tag, index) => (
                    <MenuItem key={index} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name="tag"
              control={control}
              error={errors?.tag ? true : false}
              defaultValue={tags[0]}
            />
             <TextField
              id="content"
              label="içerik"
              name="content"
              variant="outlined"
              size="small"
              multiline
              rows={4}
              fullWidth
              className={classes.textField}
              {...register("content")}
              error={errors?.content ? true : false}
            />

            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setFile(base64)}
            />

          </form>
        </div>
      </DialogContent>
      <DialogActions>
          <Button color="inherit" onClick={clearForm} >Vazgeç</Button>
          <Button color="primary" variant="outlined" type="submit" onClick={() => handleSubmit(onSubmit)()}  >Yayınla</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostForm;
