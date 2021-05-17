import React ,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post";
import gridFour from "../images/grid_four.svg";
import gridThree from "../images/grid_three.svg";


const useStyles = makeStyles((theme) => ({
  layoutShifter:{
    float:"right",
    margin: theme.spacing(2),
  },
}));



const PostLists = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts.posts);
  const [layout , setlayout] = useState("gridThree");

  const calculateMdValue = () => {
    return layout === "gridThree" ? 4 : 3 ;
  };



  return (
    <>
      {/* Layout Shifter */}
      <div className={classes.layoutShifter}>
        <Button 
          variant="text"
          size="small"
          onClick={()=>{setlayout("gridThree")}}
        >
          <img 
            src={gridThree}
            alt="Three columns grid icon"
            style={{background: layout === "gridThree" ? "#ccc" : "" }}
          />
        </Button>

        <Button 
          variant="text"
          size="small"
          onClick={()=>{setlayout("gridFour")}}
        >
          <img 
            src={gridFour}
            alt="Four columns grid icon"
            style={{background: layout === "gridFour" ? "#ccc" : "" }}
          />
        </Button>

      </div>
      <Grid container spacing={2} alignContent="stretch">
        {posts.length > 0 &&
          posts.map((post) => (
            <Grid  item key={post?._id} xs={12} md={calculateMdValue()}>
              <Post {...post} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default PostLists;
